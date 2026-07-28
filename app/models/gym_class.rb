# frozen_string_literal: true

class GymClass < ApplicationRecord
  belongs_to :organization
  belongs_to :trainer

  has_many :bookings, dependent: :destroy

  attribute :status, :integer
  enum :status, { scheduled: 0, cancelled: 1, completed: 2 }

  validates :name, presence: true

  rhino_owner :organization
  rhino_references [ :organization, :trainer ]
end
