# frozen_string_literal: true

require "test_helper"

class AiControllerTest < Rhino::TestCase::ControllerTest
  setup do
    @organization1 = create(:organization, name: "Apex Fitness")
    @organization2 = create(:organization, name: "Gold Gym")

    @staff_role = Role.find_or_create_by!(name: "gym_staff")
    @member_role = Role.find_or_create_by!(name: "gym_member")

    @staff1 = create(:user)
    create(:users_role, user: @staff1, organization: @organization1, role: @staff_role)

    @user1 = create(:user)
    @user2 = create(:user)

    # Associate users with organizations
    create(:users_role, user: @user1, organization: @organization1, role: @member_role)
    create(:users_role, user: @user2, organization: @organization2, role: @member_role)
  end

  def sign_in(user = nil)
    super(user)
    @auth_headers = {
      "auth-access-token" => response.headers["auth-access-token"],
      "auth-client" => response.headers["auth-client"],
      "auth-expiry" => response.headers["auth-expiry"],
      "auth-uid" => response.headers["auth-uid"],
      "auth-token-type" => response.headers["auth-token-type"]
    }
  end

  def post_api(path, params: {}, headers: {})
    post path, params:, headers: (@auth_headers || {}).merge(headers), xhr: true, as: :json
  end

  test "should get schedule recommendations for valid organization" do
    sign_in @staff1
    post_api api_ai_schedule_recommendations_path, params: { gym_slug: @organization1.slug }
    assert_response :success
    json = JSON.parse(response.body)
    assert_includes json["recommendations"].first["reasoning"], "Apex Fitness"
  end

  test "should return 404 for invalid organization slug" do
    sign_in @staff1
    post_api api_ai_schedule_recommendations_path, params: { gym_slug: "non-existent" }
    assert_response :not_found
  end

  test "should generate member outreach for user in same organization" do
    sign_in @staff1
    post_api api_ai_member_outreach_path, params: { gym_slug: @organization1.slug, user_id: @user1.id }
    assert_response :success
    json = JSON.parse(response.body)
    assert_includes json["outreach_message"], "Apex Fitness"
  end

  test "should prevent member outreach for user in different organization" do
    sign_in @staff1
    post_api api_ai_member_outreach_path, params: { gym_slug: @organization1.slug, user_id: @user2.id }
    assert_response :forbidden
  end
end
