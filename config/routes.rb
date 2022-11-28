# frozen_string_literal: true

Rails.application.routes.draw do
  devise_for :users
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  root 'home#index'

  namespace :api, defaults: { format: 'json' } do
    get '/users_by_email' => 'users_by_emails#show', as: :users_by_email
  end
end
