class HomeController < ApplicationController
  def index
    @styles = $brewery_db.styles.all
  end
end
