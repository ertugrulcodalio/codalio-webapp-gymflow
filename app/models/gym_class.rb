# frozen_string_literal: true

class GymClass < ApplicationRecord
  before_destroy :ensure_no_active_bookings

  belongs_to :organization
  belongs_to :trainer

  has_many :bookings, dependent: :destroy

  attribute :status, :integer
  enum :status, { scheduled: 0, cancelled: 1, completed: 2 }

  validates :name, presence: true
  validates :capacity, numericality: { only_integer: true, greater_than: 0 }

  rhino_owner :organization
  rhino_references [ :organization, :trainer ]

  private

  def ensure_no_active_bookings
    if bookings.where(status: :confirmed).exists?
      errors.add(:base, "Cannot delete class with active bookings")
      throw(:abort)
    end
  end
end
