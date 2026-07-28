# frozen_string_literal: true

require "test_helper"

class MembershipPlanTest < ActiveSupport::TestCase
  setup do
    @organization = create(:organization)
    @membership_plan = create(:membership_plan, organization: @organization)
  end

  test "should allow deletion if no active members are associated" do
    assert @membership_plan.destroy
  end

  test "should prevent deletion if active members are associated" do
    create(:user, membership_plan: @membership_plan)

    assert_not @membership_plan.destroy
    assert_includes @membership_plan.errors[:base], "Cannot delete plan with active members"
  end
end
