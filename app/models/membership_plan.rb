# frozen_string_literal: true

class MembershipPlan < ApplicationRecord
  belongs_to :organization

  attribute :status, :integer
  enum :status, { active: 0, inactive: 1 }

  validates :name, presence: true

  rhino_owner :organization
  rhino_references [ :organization ]
end
