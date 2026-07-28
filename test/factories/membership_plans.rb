# frozen_string_literal: true

FactoryBot.define do
  factory :membership_plan do
    name { "MyString" }
    description { "MyText" }
    price { 1.5 }
    status { 1 }
    organization { nil }
  end
end
