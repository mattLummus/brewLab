class HopsController < ApplicationController

  def index
    @hops = $brewery_db.hops.all
  end

  def show
    hop_id = params[:id]
    @hop = $brewery_db.hops.find(hop_id)
  end

end
