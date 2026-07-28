# frozen_string_literal: true

FactoryBot.define do
  factory :trainer do
    name { "MyString" }
    bio { "MyText" }
    status { 1 }
    organization { nil }
  end
end
