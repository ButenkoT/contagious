class GameBoardsController < ApplicationController
  def index
  end

  def save_score
    @game_board = Game_board.new
    if @game_board.save
      game_boards[:score] = @game_board.score
    else
      render :new
    end
  end

  def create_board
    respond_to do |format|
      format.html{}
      format.json {render :json => Game_Board.id}
    end
  end

end