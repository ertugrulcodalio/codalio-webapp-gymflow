# frozen_string_literal: true

require "ffaker"

FactoryBot.define do
  factory :organization do
    name { FFaker::Company.name }
  end
end
