class SessionController < ApplicationController
  #login form
  def new
  end

  #where the login form POSTs data
  def create
    player = Player.where(:email => params[:email]).first
    if player.present? && player.authenticate(params[:password])
      session[:player_id] = player.id
      redirect_to root_path
    else
      redirect_to login_path
    end
  end


  #logout
  def destroy
    session[:player_id] = nil
    redirect_to root_path
  end
end