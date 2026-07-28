# frozen_string_literal: true

FactoryBot.define do
  factory :branding_setting do
    logo_url { "MyString" }
    primary_color { "MyString" }
    organization { nil }
  end
end
