require 'rails_helper'

RSpec.describe "Api::Users", type: :request do
  describe "GET show" do
    let(:header) do
      {"ACCEPT" => "application/js"}
    end

    context "user exist" do
      xit "is successful" do
        user = create(:user)
        get api_user_path(user), headers: header
        expect(response).to be_successful
      end
    end

    context "user does not exist" do
      xit "is not found" do
        get api_user_path(id: "12"), headers: header
        expect(response.status).to be 404
      end
    end
  end
end