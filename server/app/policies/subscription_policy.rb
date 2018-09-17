class SubscriptionPolicy < ApplicationPolicy
  def create?
    user.present?
  end
end
