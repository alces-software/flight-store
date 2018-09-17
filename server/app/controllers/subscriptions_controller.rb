class SubscriptionsController < ApplicationController
  def create
    authorize nil, policy_class: SubscriptionPolicy

    # XXX Do Strip API things here.
    # create_customer if needed?
    # add_token_to_customer
    # retrieve_subscription_for_cluster_pack
    # retrieve_plan_subscription
    # add_customer_to_subscription_plan
  end
end
