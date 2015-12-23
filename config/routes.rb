Rails.application.routes.draw do
  devise_for :users

  get "/cake" => "application#cake"
  get "/current" => "application#current"
  get "/sheets/:id" => "sheet_editor#index"
  post "/answer/:id" => "sheet_editor#update_answer"

  get "/lectures/" => "lecture_list#index"
  get "/lectures/:id" => "sheets#index"
  get "/dashboard/:id" => "sheet_dashboard#index"
  get "/subscribe/:id" => "lecture_list#subscribe"

  get "/api/stats/" => "api#statistics_for_question"
  get "/api/questions/" => "api#questions"
  get "/api/completions/" => "api#completions"
  get "/api/lectures/" => "api#lectures"
  get "/api/lecture/" => "api#lecture"
  get "/api/sheets/" => "api#sheets"
  post "/api/subscribe" => "api#subscribe"

  # The priority is based upon order of creation: first created -> highest priority.
  # See how all your routes lay out with "rake routes".

  # You can have the root of your site routed with "root"
  root 'application#index'

  # Example of regular route:
  #   get 'products/:id' => 'catalog#view'

  # Example of named route that can be invoked with purchase_url(id: product.id)
  #   get 'products/:id/purchase' => 'catalog#purchase', as: :purchase

  # Example resource route (maps HTTP verbs to controller actions automatically):
  #   resources :products

  # Example resource route with options:
  #   resources :products do
  #     member do
  #       get 'short'
  #       post 'toggle'
  #     end
  #
  #     collection do
  #       get 'sold'
  #     end
  #   end

  # Example resource route with sub-resources:
  #   resources :products do
  #     resources :comments, :sales
  #     resource :seller
  #   end

  # Example resource route with more complex sub-resources:
  #   resources :products do
  #     resources :comments
  #     resources :sales do
  #       get 'recent', on: :collection
  #     end
  #   end

  # Example resource route with concerns:
  #   concern :toggleable do
  #     post 'toggle'
  #   end
  #   resources :posts, concerns: :toggleable
  #   resources :photos, concerns: :toggleable

  # Example resource route within a namespace:
  #   namespace :admin do
  #     # Directs /admin/products/* to Admin::ProductsController
  #     # (app/controllers/admin/products_controller.rb)
  #     resources :products
  #   end
end
