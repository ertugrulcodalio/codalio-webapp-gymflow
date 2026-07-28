# frozen_string_literal: true

require "test_helper"

class BookingTest < ActiveSupport::TestCase
  setup do
    @organization = create(:organization)
    @trainer = create(:trainer, organization: @organization)
    @user = create(:user)
    @gym_class = create(:gym_class, organization: @organization, trainer: @trainer, capacity: 2, start_time: 1.day.from_now)
  end

  test "should be valid with valid attributes" do
    booking = Booking.new(organization: @organization, user: @user, gym_class: @gym_class)
    assert booking.valid?
  end

  test "should prevent booking if class is full" do
    # Create bookings up to capacity
    create(:booking, organization: @organization, user: create(:user), gym_class: @gym_class, status: :confirmed)
    create(:booking, organization: @organization, user: create(:user), gym_class: @gym_class, status: :confirmed)

    # Try to create another booking
    booking = Booking.new(organization: @organization, user: @user, gym_class: @gym_class)
    assert_not booking.valid?
    assert_includes booking.errors[:base], "Class is full"
  end

  test "should prevent duplicate bookings for the same class by the same member" do
    create(:booking, organization: @organization, user: @user, gym_class: @gym_class, status: :confirmed)

    booking = Booking.new(organization: @organization, user: @user, gym_class: @gym_class)
    assert_not booking.valid?
    assert_includes booking.errors[:base], "You have already booked this class"
  end

  test "should prevent booking classes in the past" do
    past_class = create(:gym_class, organization: @organization, trainer: @trainer, capacity: 5, start_time: 1.day.ago)
    booking = Booking.new(organization: @organization, user: @user, gym_class: past_class)
    assert_not booking.valid?
    assert_includes booking.errors[:base], "Cannot book a class in the past"
  end
end
