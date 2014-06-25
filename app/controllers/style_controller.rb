class StyleController < ApplicationController

  def show
    style_id = params[:id]
    @style = $brewery_db.styles.find(style_id)
  end

end
