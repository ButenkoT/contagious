class PlayersController < ApplicationController
  def new
    @player = Player.new
  end

  def create
    @player = Player.new player_params
    if @player.save
      session[:player_id] = @player.id
      redirect_to game_boards_path
    else
      render :new
    end
  end

  def edit
    @player = @current_player

  end

  def update
    player = @current_player
    # if @current_player.update player_params
    #   redirect_to @current_player
    # else
    #   render :edit
    # end
    player.update player_params
    redirect_to player
  end

  def index
    @players = Player.all
    # getting in json format get it through localhost3000/tasks.json
    # respond_to do |format|
    #   format.html{}
    #   format.json {render :json => @players}
    # end
  end

  def show
    @player = Player.find params[:id]
  end

  def check_email
    @player = Player.find_by :email => params[:email]
    if @player 
      render "session/new", :layout => false
    else
      @user = Player.new
      render :new, :layout => false
    end
  end


  private
  def player_params
    params.require(:player).permit(:nickname, :email, :password, :password_confirmation)
  end
end