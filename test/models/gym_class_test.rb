# frozen_string_literal: true

require "test_helper"

class GymClassTest < ActiveSupport::TestCase
  setup do
    @organization = create(:organization)
    @trainer = create(:trainer, organization: @organization)
    @gym_class = create(:gym_class, organization: @organization, trainer: @trainer, capacity: 10, start_time: 1.day.from_now)
  end

  test "should validate capacity is a positive integer greater than zero" do
    @gym_class.capacity = 0
    assert_not @gym_class.valid?
    assert_includes @gym_class.errors[:capacity], "must be greater than 0"

    @gym_class.capacity = -5
    assert_not @gym_class.valid?
    assert_includes @gym_class.errors[:capacity], "must be greater than 0"

    @gym_class.capacity = 1.5
    assert_not @gym_class.valid?
    assert_includes @gym_class.errors[:capacity], "must be an integer"
  end

  test "should allow deletion if no active bookings are associated" do
    assert @gym_class.destroy
  end

  test "should prevent deletion if active bookings are associated" do
    create(:booking, organization: @organization, user: create(:user), gym_class: @gym_class, status: :confirmed)

    assert_not @gym_class.destroy
    assert_includes @gym_class.errors[:base], "Cannot delete class with active bookings"
  end
end
