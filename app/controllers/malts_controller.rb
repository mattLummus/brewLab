class MaltsController < ApplicationController

  def index
    @malts = $brewery_db.fermentables.all
  end

  def show
    malt_id = params[:id]
    @malt = $brewery_db.fermentables.find(malt_id)
  end

end
