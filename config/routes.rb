Rails.application.routes.draw do
  root 'dashboard#index'
  devise_for :users

  resources :posts do
    resources :comments
  end
end
