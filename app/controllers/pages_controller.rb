class PagesController < ApplicationController
  def index
  	@player = Player.new

    # respond_to do |format|
    #   format.html{}
    #   format.json {render :json => @player}
    # end
  end

end
