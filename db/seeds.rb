# frozen_string_literal: true

10.times do |i|
  property = Property.create!(
    name: Faker::Lorem.word,
    headline: Faker::Lorem.sentence,
    description: Faker::Lorem.paragraph,
    address_1: Faker::Address.street_address,
    city: Faker::Address.city,
    country: 'New Zealand',
    price_cents: Money.from_amount((50..200).to_a.sample)
  )

  property.images.attach(io: File.open(Rails.root.join('db', 'sample', 'images', "property_#{i + 1}.png")),
                         filename: property.name)
end
