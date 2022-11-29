# frozen_string_literal: true

FactoryBot.define do
  factory :property do
    name { 'MyString' }
    headline { 'MyString' }
    description { 'MyText' }
    city { Faker::Address.city }
    country { 'New Zealand' }
    address_1 { Faker::Address.street_address }
  end
end
