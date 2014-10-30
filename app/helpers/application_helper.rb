
module ApplicationHelper
  def intellinav
    nav = ''
    if @current_player.present?

      # Play Button
      nav += "<li><a href='" + game_boards_path + "'><i class='fa fa-caret-square-o-right fa-3x'></i></a></li> "

      # Profile Button
      nav += "<li><a href='" + player_path(@current_player) + "'><i class='fa fa-user fa-3x'></i></a></li> "

      # Logout Button
      nav += "<li><a href='" + login_path + "' data-method='delete' data-confirm='Are you sure you want to leave the game?'><i class='fa fa-sign-out fa-3x'></i></a></li> "
      
      # Leaderboard Button
      nav += "<li><a href='" + players_path + "'><i class='fa fa-trophy fa-3x'></i></a></li> "

    else
      nav += "<li>#{ link_to('Register', new_player_path) }</li> "
      nav += "<li>#{ link_to('Sign in', login_path) }</li>"
    end
    nav
  end
end

# nav += "<li><a href='" + new_player_path + "'><i class='fa fa-home fa-3x'></i></a></li> "
