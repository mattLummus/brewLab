require 'rails_helper'

RSpec.describe "recipes/index", :type => :view do
  before(:each) do
    assign(:recipes, [
      Recipe.create!(
        :title => "Title",
        :notes => "MyText"
      ),
      Recipe.create!(
        :title => "Title",
        :notes => "MyText"
      )
    ])
  end

  it "renders a list of recipes" do
    render
    assert_select "tr>td", :text => "Title".to_s, :count => 2
    assert_select "tr>td", :text => "MyText".to_s, :count => 2
  end
end
