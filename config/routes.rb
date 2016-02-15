Rails.application.routes.draw do
  devise_for :users

  get "/cake" => "application#cake"
  get "/current" => "application#current"
  get "/sheets/:id" => "sheet_editor#index"
  post "/answer/:id" => "sheet_editor#update_answer"

  get "/lectures/" => "lecture_list#index"
  get "/lectures/:id" => "sheets#index"
  get "/lectures/manage/:id" => "sheet_manager#index"
  get "/dashboard/:id" => "sheet_dashboard#index"
  get "/subscribe/:id" => "lecture_list#subscribe"

  get "/create/sheet/:id" => "sheet_creator#index"
  get "/create/lecture" => "lecture_creator#index"

  get "/api/stats/" => "api#statistics_for_question"
  get "/api/questions/" => "api#questions"
  get "/api/completions/" => "api#completions"
  get "/api/lectures/" => "api#lectures"
  get "/api/lecture/" => "api#lecture"
  get "/api/sheets/" => "api#sheets"
  post "/api/subscribe" => "api#subscribe"

  post "/api/create/sheet" => "api#create_sheet"
  post "/api/create/lecture" => "api#create_lecture"

  post "/api/delete/sheet" => "api#delete_sheet"
  post "/api/update/lecture" => "api#update_lecture"
  post "/api/update/sheet" => "api#update_sheet"


  root 'application#index'

end
