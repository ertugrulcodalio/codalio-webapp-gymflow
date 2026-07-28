# frozen_string_literal: true

class Booking < ApplicationRecord
  belongs_to :organization
  belongs_to :user
  belongs_to :gym_class

  attribute :status, :integer
  enum :status, { confirmed: 0, cancelled: 1 }

  attribute :attendance_status, :integer
  enum :attendance_status, { pending: 0, attended: 1, no_show: 2 }

  validates :status, presence: true
  validate :class_capacity_not_exceeded, on: :create
  validate :no_duplicate_bookings, on: :create
  validate :class_not_in_past, on: :create

  rhino_owner :organization
  rhino_references [ :organization, :user, :gym_class ]

  private

  def class_capacity_not_exceeded
    return unless gym_class

    # Count active (confirmed) bookings for this class
    active_bookings_count = gym_class.bookings.where(status: :confirmed).count
    if active_bookings_count >= gym_class.capacity
      errors.add(:base, "Class is full")
    end
  end

  def no_duplicate_bookings
    return unless gym_class && user

    # Check if this user already has a confirmed booking for this class
    if gym_class.bookings.where(user: user, status: :confirmed).exists?
      errors.add(:base, "You have already booked this class")
    end
  end

  def class_not_in_past
    return unless gym_class&.start_time

    if gym_class.start_time < Time.current
      errors.add(:base, "Cannot book a class in the past")
    end
  end
end
