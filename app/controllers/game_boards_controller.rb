class GameBoardsController < ApplicationController
  def index
  end

 
  def create_board
    game_board = Game_board.new
    game_board[:player_id] = session[:player_id]
    if game_board.save
      render json: game_board.id
    else
      render json: 0
    end
  end

   def save_score
    game_board = Game_board.find_by :id => params[:board_id] 
    if game_board 
      game_board.score = params[:score]
      if game_board.save
      render json: game_board.score 
      else
        render json: 0
      end
    else
      render json: 0
    end
  end


end