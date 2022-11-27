require 'rails_helper'

RSpec.describe "Api::UsersByEmails", type: :request do
  describe "GET show" do
    let(:header) do
      {"ACCEPT" => "application/js"}
    end

    context "user exist" do
      xit "is successful" do
        user = create(:user)
        get api_users_by_email_path, params:{email: user.email}, headers: header
        expect(response).to be_successful
      end
    end

    context "user does not exist" do
      xit "is not found" do
        get api_users_by_email_path, params:{email: "test@example.com"}, headers: header
        expect(response.status).to be 404
      end
    end
  end
end