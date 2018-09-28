class ChargesController < ApplicationController
  def create
    authorize nil, policy_class: ChargePolicy

    # XXX Handle errors.
    #
    # A list of card numbers producing errors can be found at
    # https://stripe.com/docs/testing#cards-responses
    #
    # Docs on errors https://stripe.com/docs/api#errors
    #
    # Docs on error handling https://stripe.com/docs/api#error_handling
    #
    charge(params[:product][:stripe], params[:token])
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
      }
    )
  end
end
