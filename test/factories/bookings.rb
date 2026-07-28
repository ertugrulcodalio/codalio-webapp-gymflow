# frozen_string_literal: true

FactoryBot.define do
  factory :booking do
    status { 1 }
    attendance_status { 1 }
    organization { nil }
    user { nil }
    gym_class { nil }
  end
end
