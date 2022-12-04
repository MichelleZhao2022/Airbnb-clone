# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'Properties::Reservations', type: :request do
  describe 'GET new' do
    let(:property) { create(:property) }
    # let(:user) { create(:user) }
    # before { sign_in user }

    it 'succeeds' do
      get new_property_reservation_path(property)
      expect(response).to be_successful
    end
  end
end
