Rails.application.routes.draw do
  namespace :api, defaults: { format: 'json' } do
    namespace :v1 do
      resources :books, only: [:index, :create, :show, :destroy] do
        get :search, on: :collection, to: "books#search"
      end
    end
  end
end
