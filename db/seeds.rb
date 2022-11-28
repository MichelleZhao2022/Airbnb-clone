# frozen_string_literal: true

10.times do
  Property.create!(
    name: Faker::Lorem.word,
    headline: Faker::Lorem.sentence,
    description: Faker::Lorem.paragraph,
    address_1: Faker::Address.street_address,
    city: Faker::Address.city,
    country: 'New Zealand'
  )
end
