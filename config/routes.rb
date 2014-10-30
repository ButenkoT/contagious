Rails.application.routes.draw do
  root :to => 'pages#index'

  get '/players/edit' => 'players#edit', :as => :edit_player
  get '/players/check' => 'players#check_email'
  resources :players, :except => [:edit]


  get '/game_boards' => 'game_boards#index'

  get '/login' => 'session#new'
  post '/login' => 'session#create'
  delete '/login' => 'session#destroy'
end
