class ChargePolicy < ApplicationPolicy
  def create?
    user.present?
  end
end
