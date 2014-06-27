require 'rails_helper'

RSpec.describe "Recipes", :type => :request do
  describe "GET /recipes" do
    it "works! (now write some real specs)" do
      get recipes_path
      expect(response.status).to be(200)
    end
  end
end
