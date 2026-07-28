# frozen_string_literal: true

class MembershipPlan < ApplicationRecord
  before_destroy :ensure_no_active_members

  belongs_to :organization
  has_many :users, dependent: :nullify

  attribute :status, :integer
  enum :status, { active: 0, inactive: 1 }

  validates :name, presence: true

  rhino_owner :organization
  rhino_references [ :organization ]

  private

  def ensure_no_active_members
    if users.exists?
      errors.add(:base, "Cannot delete plan with active members")
      throw(:abort)
    end
  end
end
