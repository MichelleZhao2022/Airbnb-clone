# frozen_string_literal: true

FactoryBot.define do
  factory :reservation do
    property { nil }
    user { nil }
    reservation_date { '2022-11-30' }
  end
end
