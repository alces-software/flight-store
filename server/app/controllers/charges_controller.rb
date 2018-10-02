class ChargesController < ApplicationController
  def create
    authorize nil, policy_class: ChargePolicy
    with_stripe_error_handling do
      charge(params[:product][:stripe], params[:token])
    end
  end

  private

  def charge(alces_product, source)
    Stripe::Charge.create(
      amount: alces_product[:amount],
      currency: alces_product[:currency],
      source: source,
      description: alces_product[:description],
      metadata: {
        flight_id: current_user.flight_id,
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
