# frozen_string_literal: true

class Property < ApplicationRecord
  validates :name, presence: true
  validates :headline, presence: true
  validates :description, presence: true
  validates :address_1, presence: true
  validates :city, presence: true
  validates :country, presence: true

  has_many_attached :images
  has_many :reviews, as: :reviewable

  def default_image
    images.first
  end

  def average_rating
    reviews.average(:rating)
  end
end
