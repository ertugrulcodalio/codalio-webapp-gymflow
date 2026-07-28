# frozen_string_literal: true

class Trainer < ApplicationRecord
  belongs_to :organization

  has_many :gym_classes, dependent: :destroy

  attribute :status, :integer
  enum :status, { active: 0, inactive: 1 }

  validates :name, presence: true

  rhino_owner :organization
  rhino_references [ :organization ]
end
