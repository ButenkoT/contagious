Rails.application.routes.draw do
  root :to => 'pages#index'

  resources :players, :except => [:edit]

  get '/game_boards' => 'game_boards#index'

  get '/login' => 'session#new'
  post '/login' => 'session#create'
  delete '/login' => 'session#destroy'
end
