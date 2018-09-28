class SubscriptionsController < ApplicationController
  def create
    authorize nil, policy_class: SubscriptionPolicy

    # XXX Handle errors.
    #
    # A list of card numbers producing errors can be found at
    # https://stripe.com/docs/testing#cards-responses
    #
    # Docs on errors https://stripe.com/docs/api#errors
    #
    # Docs on error handling https://stripe.com/docs/api#error_handling
    #
    product = find_stripe_product(params[:product])
    plan = find_stripe_plan(product)
    subscribe(stripe_customer, plan)
  end

  private

  def find_stripe_product(alces_product)
    product_id = alces_product[:stripe][:productId]
    Stripe::Product.retrieve(product_id)
  end

  def find_stripe_plan(product)
    plans = Stripe::Plan.list(
      active: true,
      product: product.id,
    )
    plans.data.first
  end

  def subscribe(customer, plan)
    Stripe::Subscription.create(
      :customer => customer.id,
      :items => [
        {
          :plan => plan.id,
        },
      ]
    )
  end

  def stripe_customer
    if current_user.stripe_id.nil?
      Stripe::Customer.create(
        email: current_user.email,
        source: params[:token],
        metadata: {
          flight_id: current_user.flight_id,
        }
      ).tap do |customer|
        current_user.stripe_id = customer.id
        current_user.save!
      end
    else
      # XXX The following is not consistent:
      #
      # - We already have a customer.
      # - We have already added a payment method (card) to the customer.
      # - The UI has asked for their card details (again).
      # - We ignore them here and use the card details we already have.
      #
      # Solution:
      #
      # Have the UI check if the flight account is associated with a stripe
      # customer and if that customer has any cards.  If so, ask user to
      # select one of their existing cards.  If not, use the current UI.
      #
      Stripe::Customer.retrieve(current_user.stripe_id)
    end
  end
end
