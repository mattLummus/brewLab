class StyleController < ApplicationController

  def index
    @styles = $brewery_db.styles.all
  end

  def show
    @style = $brewery_db.styles.find(params[:id])
  end

end
