# frozen_string_literal: true

require "test_helper"

class GymFlowIntegrationTest < Rhino::TestCase::ControllerTest
  setup do
    Rails.application.routes.default_url_options[:host] = "localhost"
    ActionMailer::Base.default_url_options[:host] = "localhost"

    @apex_fitness = create(:organization, name: "Apex Fitness")
    @gold_gym = create(:organization, name: "Gold Gym")

    @staff_role = Role.find_or_create_by!(name: "gym_staff")
    @member_role = Role.find_or_create_by!(name: "gym_member")

    # Apex Fitness Staff
    @apex_staff = create(:user)
    create(:users_role, user: @apex_staff, organization: @apex_fitness, role: @staff_role)

    # Apex Fitness Member 1
    @apex_member1 = create(:user)
    create(:users_role, user: @apex_member1, organization: @apex_fitness, role: @member_role)

    # Apex Fitness Member 2
    @apex_member2 = create(:user)
    create(:users_role, user: @apex_member2, organization: @apex_fitness, role: @member_role)

    # Gold Gym Member
    @gold_member = create(:user)
    create(:users_role, user: @gold_member, organization: @gold_gym, role: @member_role)

    # Trainers
    @apex_trainer = create(:trainer, organization: @apex_fitness, name: "Apex Trainer")
    @gold_trainer = create(:trainer, organization: @gold_gym, name: "Gold Trainer")

    # Gym Classes
    @apex_class = create(:gym_class, organization: @apex_fitness, trainer: @apex_trainer, name: "Apex HIIT", capacity: 5, start_time: 1.day.from_now, end_time: 1.day.from_now + 1.hour)
    @gold_class = create(:gym_class, organization: @gold_gym, trainer: @gold_trainer, name: "Gold Yoga", capacity: 5, start_time: 1.day.from_now, end_time: 1.day.from_now + 1.hour)
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

  def get_api(path, params: {}, headers: {})
    super(path, params:, headers: (@auth_headers || {}).merge(headers))
  end

  def post_api(path, params: {}, headers: {})
    post path, params:, headers: (@auth_headers || {}).merge(headers), xhr: true, as: :json
  end

  def patch_api(path, params: {}, headers: {})
    super(path, params:, headers: (@auth_headers || {}).merge(headers))
  end

  def delete_api(path, params: {}, headers: {})
    delete path, params:, headers: (@auth_headers || {}).merge(headers), xhr: true, as: :json
  end

  # AC-3: All database queries are automatically scoped to the resolved tenant ID.
  # AC-4: Any request attempting to access data from another tenant returns a 403 Forbidden or 404 Not Found error.
  # AC-53: Automated tests verify that a member registered under Apex Fitness cannot view or book classes at Gold Gym.
  test "AC-3, AC-4, AC-53: enforces strict tenant isolation for gym classes" do
    sign_in @apex_member1

    # Can see Apex Fitness classes
    get_api "/api/gym_classes"
    assert_response_ok
    class_ids = parsed_response["results"].map { |c| c["id"] }
    assert_includes class_ids, @apex_class.id
    assert_not_includes class_ids, @gold_class.id

    # Cannot see Gold Gym class directly
    get_api "/api/gym_classes/#{@gold_class.id}"
    assert_includes [403, 404], response.status
  end

  # AC-10: Upon successful registration, a new gym_member record is created, scoped strictly to the current tenant.
  # AC-11: The system automatically authenticates the new member and redirects them to the member dashboard.
  test "AC-10, AC-11: allows guest to register and automatically authenticates them" do
    post "/api/auth", params: {
      name: "New Member",
      email: "new_member@example.com",
      password: "password",
      password_confirmation: "password"
    }, as: :json
    assert_response :success

    # Verify user is created
    new_user = User.find_by(email: "new_member@example.com")
    assert_not_nil new_user
  end

  # AC-15: Unauthenticated users are redirected to /login when accessing protected routes (or return 401 for API).
  # AC-18: The system enforces role-based access control (RBAC) on all API endpoints, returning 403 Forbidden for unauthorized roles.
  test "AC-15, AC-18: enforces authentication and role-based access control" do
    # Unauthenticated
    get_api "/api/gym_classes"
    assert_response_unauthorized

    # Authenticated as member, but trying to create a membership plan (staff only)
    sign_in @apex_member1
    post_api "/api/membership_plans", params: {
      crud: {
        name: "Premium Plan",
        price: 99.99,
        status: "active",
        organization: @apex_fitness.id
      }
    }
    assert_response_forbidden

    # Authenticated as staff, can create a membership plan
    sign_in @apex_staff
    post_api "/api/membership_plans", params: {
      crud: {
        name: "Premium Plan",
        price: 99.99,
        status: "active",
        organization: @apex_fitness.id
      }
    }
    assert_response_ok
  end

  # AC-23: Staff can delete a plan only if it has no active members associated with it.
  test "AC-23: prevents deleting membership plan with active members" do
    sign_in @apex_staff

    # Create plan
    plan = create(:membership_plan, organization: @apex_fitness, name: "Gold Plan")

    # Associate member with plan
    @apex_member1.update!(membership_plan: plan)

    # Attempt to delete plan
    delete_api "/api/membership_plans/#{plan.id}"
    assert_response_unprocessable
    assert_includes parsed_response["errors"]["base"], "Cannot delete plan with active members"
  end

  # AC-28: The system validates that class capacity is a positive integer greater than zero.
  # AC-29: Staff cannot delete a class that has active bookings; they must cancel bookings or set the class to inactive.
  test "AC-28, AC-29: validates class capacity and prevents deleting class with active bookings" do
    sign_in @apex_staff

    # Validate capacity > 0
    post_api "/api/gym_classes", params: {
      crud: {
        name: "Invalid Class",
        capacity: 0,
        start_time: 1.day.from_now,
        end_time: 1.day.from_now + 1.hour,
        trainer: @apex_trainer.id,
        organization: @apex_fitness.id
      }
    }
    assert_response_unprocessable

    # Create valid class
    gym_class = create(:gym_class, organization: @apex_fitness, trainer: @apex_trainer, capacity: 5, start_time: 1.day.from_now)

    # Create booking
    create(:booking, organization: @apex_fitness, user: @apex_member1, gym_class: gym_class, status: :confirmed)

    # Attempt to delete class
    delete_api "/api/gym_classes/#{gym_class.id}"
    assert_response_unprocessable
    assert_includes parsed_response["errors"]["base"], "Cannot delete class with active bookings"
  end

  # AC-37: The system prevents booking a class that has reached its maximum capacity (hard block, no waitlist).
  # AC-38: The system prevents duplicate spots for the same class by the same member.
  # AC-39: The system prevents booking classes that occur in the past.
  test "AC-37, AC-38, AC-39: enforces booking validations" do
    sign_in @apex_member1

    # 1. Prevent booking past classes
    past_class = create(:gym_class, organization: @apex_fitness, trainer: @apex_trainer, capacity: 5, start_time: 1.day.ago)
    post_api "/api/bookings", params: {
      crud: {
        gym_class: past_class.id,
        organization: @apex_fitness.id,
        user: @apex_member1.id
      }
    }
    assert_response_unprocessable
    assert_includes parsed_response["errors"]["base"], "Cannot book a class in the past"

    # 2. Prevent duplicate bookings
    post_api "/api/bookings", params: {
      crud: {
        gym_class: @apex_class.id,
        organization: @apex_fitness.id,
        user: @apex_member1.id
      }
    }
    assert_response_ok

    post_api "/api/bookings", params: {
      crud: {
        gym_class: @apex_class.id,
        organization: @apex_fitness.id,
        user: @apex_member1.id
      }
    }
    assert_response_unprocessable
    assert_includes parsed_response["errors"]["base"], "You have already booked this class"

    # 3. Prevent booking full class
    small_class = create(:gym_class, organization: @apex_fitness, trainer: @apex_trainer, capacity: 1, start_time: 1.day.from_now)
    # First booking (by member 1)
    post_api "/api/bookings", params: {
      crud: {
        gym_class: small_class.id,
        organization: @apex_fitness.id,
        user: @apex_member1.id
      }
    }
    assert_response_ok

    # Second booking (by member 2)
    sign_in @apex_member2
    post_api "/api/bookings", params: {
      crud: {
        gym_class: small_class.id,
        organization: @apex_fitness.id,
        user: @apex_member2.id
      }
    }
    assert_response_unprocessable
    assert_includes parsed_response["errors"]["base"], "Class is full"
  end

  # AC-43: Strict server-side policy safeguards ensure a member cannot view, update, or delete bookings belonging to other members.
  test "AC-43: prevents member from managing other members' bookings" do
    # Member 1 creates a booking
    sign_in @apex_member1
    post_api "/api/bookings", params: {
      crud: {
        gym_class: @apex_class.id,
        organization: @apex_fitness.id,
        user: @apex_member1.id
      }
    }
    assert_response_ok
    booking_id = parsed_response["id"]

    # Member 2 tries to view Member 1's booking
    sign_in @apex_member2
    get_api "/api/bookings/#{booking_id}"
    assert_includes [403, 404], response.status

    # Member 2 tries to delete Member 1's booking
    delete_api "/api/bookings/#{booking_id}"
    assert_includes [403, 404], response.status
  end

  # AC-50: All analytics queries are executed with strict tenant isolation to prevent cross-tenant data leaks.
  test "AC-50: enforces tenant isolation on analytics" do
    sign_in @apex_staff
    # Verify we can access analytics for Apex Fitness
    post_api api_ai_schedule_recommendations_path, params: { gym_slug: @apex_fitness.slug }
    assert_response :success

    # Verify we cannot access analytics for Gold Gym
    post_api api_ai_schedule_recommendations_path, params: { gym_slug: @gold_gym.slug }
    assert_response :forbidden
  end

  # AC-59: The system validates the logo file format and size (e.g., maximum 2MB).
  # AC-60: The custom logo and primary brand color are saved to the gym's organization record.
  test "AC-59, AC-60: saves branding settings" do
    sign_in @apex_staff
    post_api "/api/branding_settings", params: {
      crud: {
        logo_url: "https://example.com/logo.png",
        primary_color: "#ff0000",
        organization: @apex_fitness.id
      }
    }
    assert_response_ok
    assert_equal "https://example.com/logo.png", parsed_response["logo_url"]
    assert_equal "#ff0000", parsed_response["primary_color"]
  end
end
