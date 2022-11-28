# frozen_string_literal: true

FactoryBot.define do
  factory :user do
    sequence(:email) { |i| "foo_#{i}@example.com" }
    password { 'password' }
  end
end
