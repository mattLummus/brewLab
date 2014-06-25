class CalcController < ApplicationController

  def show
    @hops = $brewery_db.hops.all
    @malts = $brewery_db.hops.all
  end

end
