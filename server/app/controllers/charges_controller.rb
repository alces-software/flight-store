class ChargesController < ApplicationController
  def create
    authorize nil, policy_class: ChargePolicy
    product_params = params.require(:product).permit(:filename, :type, :identifier)
    product = Product.load!(
      product_params[:filename],
      product_params[:type],
      product_params[:identifier],
    )
    charge = with_stripe_error_handling do
      charge_card(product, params[:token])
    end
    begin
      product.action.call(charge, current_user)
    rescue
      # We've charged the customer and not delivered.  We should do something
      # here.  Perhaps rollback the charge, or simply inform ourselves that we
      # need to look into this.
      raise
    end
    if product.action.flash.present?
      flash[:success] = product.action.flash
      flash[:keep_success] = true
    end
    if product.action.redirect_url.present?
      redirect_to product.action.redirect_url
    end
    # We've successfully processed the charge.  We may want to inform the
    # customer or ourselves.
  rescue => e
    backtrace = e.backtrace.map { |line| line.sub(Rails.root.to_s, '') }
    Rails.logger.error([e.class, e.message, *backtrace].join("\n"))
    render(status: 500, json: { code: 500, message: e.message })
  end

  private

  def charge_card(product, source)
    stripe_params = product.stripe_params
    Stripe::Charge.create(
      amount: stripe_params.amount_with_vat,
      currency: stripe_params.currency,
      source: source,
      description: stripe_params.description,
      metadata: {
        user_id: current_user.id,
        action_identifier: product.action.identifier,
      },
      receipt_email: current_user.email,
    )
  end

  # For `CardError`s such as a card being declined and produce a sensible JSON
  # error response to the client.  All other errors are raised by this
  # function with the expectation that they will result in a 500 response by
  # the server and the client displaying an unexpected error message.
  def with_stripe_error_handling
    # A list of card numbers producing errors can be found at
    # https://stripe.com/docs/testing#cards-responses
    #
    # Docs on errors https://stripe.com/docs/api#errors
    #
    # Docs on error handling https://stripe.com/docs/api#error_handling
    #
    begin
      yield
    rescue Stripe::CardError => e
      body = e.json_body
      err  = body[:error]
      Rails.logger.info(
        "Charging card failed. Charge ID=#{err[:charge]}. Code=#{err[:code]}. \
        Decline code=#{err[:decline_code]}. Message=#{err[:message]}."
      )

      render(
        status: e.http_status,
        json: {
          type: err[:type],
          code: err[:code],
          decline_code: err[:decline_code],
          message: err[:message],
        }
      )

    rescue Stripe::RateLimitError => e
      # Too many requests made to the API too quickly
      Rails.logger.error(e)
      raise e
    rescue Stripe::InvalidRequestError => e
      # Invalid parameters were supplied to Stripe's API
      Rails.logger.error(e)
      raise e
    rescue Stripe::AuthenticationError => e
      # Authentication with Stripe's API failed
      # (maybe you changed API keys recently)
      Rails.logger.error(e)
      raise e
    rescue Stripe::APIConnectionError => e
      # Network communication with Stripe failed
      Rails.logger.error(e)
      raise e
    rescue Stripe::StripeError => e
      # Display a very generic error to the user, and maybe send
      # yourself an email
      Rails.logger.error(e)
      raise e
    rescue => e
      # Something else happened, completely unrelated to Stripe
      Rails.logger.error(e)
      raise e
    end
  end
end
