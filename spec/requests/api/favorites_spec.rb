# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'Api::Favorites', type: :request do
  let(:headers) do
    { 'ACCEPT' => 'application/js' }
  end
  let!(:user) { create(:user) }
  let!(:property) { create(:property) }

  # before { sign_in user }
  describe 'Post create' do
    let(:params) do
      {
        user_id: user.id,
        property_id: property.id
      }
    end

    it 'create a new favorite' do
      expect do
        post api_favorites_path, params: params, headers: headers
      end.to change(Favorite, :count).by(1)
      expect(response.status).to eq 201
    end
  end

  describe 'Delete destroy' do
    let!(:favorite) { create(:favorite, user_id: user.id, property_id: property.id) }

    it 'delete a favorite' do
      expect do
        delete api_favorite_path(favorite), headers: headers
      end.to change(Favorite, :count).by(-1)
      expect(response.status).to eq 204
    end
  end
end
