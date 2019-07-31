class ChargesController < ApplicationController
  def create
    authorize nil, policy_class: ChargePolicy
    intent = with_stripe_error_handling do
      create_payment_intent
    end

    if intent.status == 'requires_source_action' && intent.next_action.type == 'use_stripe_sdk'
      render(status: :ok, json: {
        requires_action: true,
        payment_intent_client_secret: intent.client_secret
      })
    elsif intent.status == 'succeeded'
      handle_fullfillment(intent)
    else
      raise "Invalid PaymentIntent status: #{intent.status.inspect}"
    end
  rescue Stripe::StripeError => e
    unless performed?
      render(status: 500, json: { code: 500, message: e.message })
    end
  rescue => e
    backtrace = e.backtrace.map { |line| line.sub(Rails.root.to_s, '') }
    Rails.logger.error([e.class, e.message, *backtrace].join("\n"))
    unless performed?
      render(status: 500, json: { code: 500, message: e.message })
    end
  end

  private

  def create_payment_intent
    if params[:payment_method_id]
      product = product_from_params
      stripe_params = product.stripe_params
      Stripe::PaymentIntent.create(
        payment_method: params[:payment_method_id],
        amount: stripe_params.amount_with_vat,
        currency: stripe_params.currency,
        confirmation_method: 'manual',
        confirm: true,
        description: stripe_params.description,
        metadata: {
          action_identifier: product.action.identifier,
          product_filename: product_params[:filename],
          product_identifier: product_params[:identifier],
          product_type: product_params[:type],
          user_id: current_user.id,
        },
        receipt_email: current_user.email,
      )
    elsif params[:payment_intent_id]
      Stripe::PaymentIntent.confirm(params[:payment_intent_id])
    end
  end

  def handle_fullfillment(intent)
    begin
      product = product_from_payment_intent(intent)
      product.action.call(intent.charges.data.first, current_user)
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
      raise e
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

  def product_params
    params.require(:product).permit(:filename, :type, :identifier)
  end

  def product_from_params
    load_product(product_params)
  end

  def product_from_payment_intent(intent)
    product_params = intent.metadata
      .select { |key, _| key.to_s.start_with?('product_') }
      .to_h
      .transform_keys { |key| key.to_s.sub(/^product_/, '') }
      .symbolize_keys
    load_product(product_params)
  end

  def load_product(product_params)
    Product.load!(
      product_params[:filename],
      product_params[:type],
      product_params[:identifier],
    )
  end
end
