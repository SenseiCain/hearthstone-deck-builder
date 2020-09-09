Rails.application.routes.draw do
  resources :heros
  resources :cards
  resources :decks, only: [:create]
end
