
module ApplicationHelper
  def intellinav
    nav = ''
    if @current_player.present?
      nav += "<li>Hello #{ @current_player.nickname }</li> "
      nav += "<li>" + link_to('Start game', game_boards_path) + "</li>"
      nav += "<li>" + link_to('Profile', player_path(@current_player)) + "</li> "
      nav += "<li>#{ link_to('Sign out', login_path, :method => :delete, :data => {:confirm => 'Are you sure?'}) }</li> "
      nav += "<li>" + link_to('Leaderboard', players_path) + "</li> "
    else
      nav += "<li>#{ link_to('Register', new_player_path) }</li> "
      nav += "<li>#{ link_to('Sign in', login_path) }</li>"
    end
    nav
  end
end
