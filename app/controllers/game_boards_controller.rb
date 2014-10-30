class GameBoardsController < ApplicationController
  def index
  end

 
  def create_board
    game_board = Game_board.new
    if game_board.save
      render json: game_board.id
    else
      render json: 0
    end
  end

   def save_score
    game_board = Game_board.find_by :id => params[:id] 
    if game_board 
      render json: game_board.score 
    else
      render json: 0
    end
  end


end