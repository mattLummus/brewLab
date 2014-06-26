class CalcController < ApplicationController

  def show
    @hops = $brewery_db.hops.all
    @malts = $brewery_db.fermentables.all
    @style = $brewery_db.styles.find(params[:id]) if params[:id]
  end

end
