Rails.application.routes.draw do

  get '/users/:id', to: 'users#show', as: 'show_user'
  put '/users/:id', to: 'users#update', as: 'update_user'
  delete '/users/:id', to: 'users#destroy', as: 'delete_user'
  post '/users', to: 'users#create', as: 'add_user'
  get '/users', to: 'users#index', as: 'users'
  post '/auth', to: 'users#auth', as: "auth"


  delete '/contacts/:id', to: 'contacts#destroy', as: 'delete_contact'
  put '/contacts/:id', to: 'contacts#update', as: 'update_contact'
  get '/contacts/:id', to: 'contacts#show', as: 'show_contact'
  get '/contacts/userlist/:id', to: 'contacts#user_list', as: "user_contacts"
  post '/contacts', to: 'contacts#create', as: 'add_contact'
  get '/contacts', to: 'contacts#index', as: 'contacts'

  resources :contact_notifications
  resources :mood_logs
  resources :mood_updates

  # resources :users, only: [:index]
  # post '/movies', to: 'movies#create', as: 'add_movie'

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
