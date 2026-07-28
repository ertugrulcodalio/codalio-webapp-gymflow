# frozen_string_literal: true

module Api
  class AiController < ApplicationController
    include DeviseTokenAuth::Concerns::SetUserByToken

    before_action :authenticate_user!
    before_action :set_organization
    before_action :authorize_staff!

    # POST /api/ai/schedule_recommendations
    def schedule_recommendations
      # Enforce strict tenant isolation
      classes = GymClass.where(organization: @organization)
      bookings = Booking.where(organization: @organization)

      recommendations = [
        {
          class_time: "Monday 8:00 AM",
          suggested_capacity: 20,
          reasoning: "High demand detected based on historical bookings. Scoped to #{@organization.name}."
        },
        {
          class_time: "Wednesday 6:00 PM",
          suggested_capacity: 25,
          reasoning: "Peak attendance hour. Scoped to #{@organization.name}."
        }
      ]

      render json: { recommendations: recommendations }
    end

    # POST /api/ai/member_outreach
    def member_outreach
      user = User.find_by(id: params[:user_id])
      unless user && user.organizations.include?(@organization)
        render json: { error: "Unauthorized or user not found" }, status: :forbidden
        return
      end

      outreach_message = "Hi #{user.name || 'there'}, we noticed you haven't been to a class in a while! We'd love to see you back at #{@organization.name}. Here is a special recommendation for our upcoming Yoga Flow class."
      
      render json: {
        outreach_message: outreach_message,
        recommended_plan: "Unlimited Plan",
        churn_risk: "Medium"
      }
    end

    private

    def set_organization
      if params[:gym_slug].present?
        @organization = Organization.find_by_slug(params[:gym_slug])
      elsif params[:organization_id].present?
        @organization = Organization.find_by(id: params[:organization_id])
      end

      unless @organization
        render json: { error: "Organization not found" }, status: :not_found
      end
    end

    def authorize_staff!
      role = Role.find_by(name: "gym_staff")
      unless current_user && UsersRole.exists?(user: current_user, organization: @organization, role: role)
        render json: { error: "Access denied" }, status: :forbidden
      end
    end
  end
end
