# frozen_string_literal: true

class GymMemberBookingPolicy < GymMemberPolicy
  def create?
    authorize_action(record.user_id == auth_owner.id)
  end

  def update?
    authorize_action(record.user_id == auth_owner.id)
  end

  def destroy?
    authorize_action(record.user_id == auth_owner.id)
  end

  def permitted_attributes_for_create
    [:status, :attendance_status, :user_id, :gym_class_id, :user, :gym_class, :organization]
  end

  def permitted_attributes_for_update
    [:status, :attendance_status]
  end

  class Scope < Scope
    def resolve
      super.where(user: auth_owner)
    end
  end
end
