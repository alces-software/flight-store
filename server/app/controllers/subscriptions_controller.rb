class SubscriptionsController < ApplicationController
  def create
    authorize nil, policy_class: SubscriptionPolicy

    # XXX Do Strip API things here.
    # create_customer if needed?
    # add_token_to_customer
    # retrieve_subscription_for_cluster_pack
    # retrieve_plan_subscription
    # add_customer_to_subscription_plan
    # XXX Handle errors.

    product = find_stripe_product(params[:cluster_pack])
    plan = find_stripe_plan(product)
    subscribe(stripe_customer, plan)
  end

  private

  def find_stripe_product(cluster_pack)
    product_id = cluster_pack[:stripe][:productId]
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
      # XXX If we already have a customer, the UI should not ask for the
      # credit card to be entered again.  There should be a slightly different
      # path through this.
      Stripe::Customer.retrieve(current_user.stripe_id)
    end
  end
end
