# frozen_string_literal: true

FactoryBot.define do
  factory :property do
    name { 'MyString' }
    headline { 'MyString' }
    description { 'MyText' }
    city { 'MyString' }
    country { 'MyString' }
  end
end
