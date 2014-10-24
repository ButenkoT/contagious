class PlayersController < ApplicationController
  def new
    @player = Player.new
  end

  def create
    @player = Player.new player_params
    if @player.save
      session[:player_id] = @player.id
      redirect_to root_path
    else
      render :new
    end
  end

  def edit
    @player = @current_player

  end

  def update
    player = @current_player
    player.update player_params
    redirect_to player
  end

  def index
    @players = Player.all
  end

  def show
    @player = Player.find params[:id]
  end



  private
  def player_params
    params.require(:player).permit(:nickname, :email, :password, :password_confirmation)
  end
end