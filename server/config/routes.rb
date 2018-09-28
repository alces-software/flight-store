Rails.application.routes.draw do
  resources :charges, only: 'create'
  resources :subscriptions, only: 'create'
end
