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
  has_many :favorites, dependent: :destroy
  has_many :favorited_users, through: :favorites, source: :user
  has_many :reservations, dependent: :destroy
  has_many :reserved_users, through: :reservations, source: :user

  def default_image
    images.first
  end

  def favorited_by?(user)
    return if user.nil?

    favorited_users.include?(user)
  end

  def available_dates
    next_reservation = reservations.future_reservations.first
    date_format = '%b %e'
    return Date.tomorrow.strftime(date_format)..Date.today.end_of_year.strftime(date_format) if next_reservation.nil?

    Date.tomorrow.strftime(date_format)..next_reservation.reservation_date.strftime(date_format)
  end
end
