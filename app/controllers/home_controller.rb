class HomeController < ApplicationController
  def index
    @styles = $brewery_db.styles.all
    @hops = $brewery_db.hops.all
    @fermentables = $brewery_db.fermentables.all
  end
end
