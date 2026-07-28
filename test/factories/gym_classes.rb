# frozen_string_literal: true

FactoryBot.define do
  factory :gym_class do
    name { "MyString" }
    description { "MyText" }
    start_time { "2026-07-28 19:02:51" }
    end_time { "2026-07-28 19:02:51" }
    capacity { 1 }
    status { 1 }
    organization { nil }
    trainer { nil }
  end
end
