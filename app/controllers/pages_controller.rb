class PagesController < ApplicationController
  def index
  	@player = Player.new
  	# redirect_to game_boards_path

    # respond_to do |format|
    #   format.html{}
    #   format.json {render :json => @player}
    # end
  end

end
