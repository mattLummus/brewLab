class StyleController < ApplicationController

  def index
    @styles = $brewery_db.styles.all
  end

  def show
    style_id = params[:id]
    @style = $brewery_db.styles.find(style_id)
  end

end
