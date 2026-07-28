# frozen_string_literal: true

FactoryBot.define do
  factory :users_role do
    user { nil }
    organization { nil }
    role { nil }
  end
end
