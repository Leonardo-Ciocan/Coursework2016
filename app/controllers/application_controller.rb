class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception
  before_action :authenticate_user!
  skip_before_action :authenticate_user! , only: [:index]

  def current
    if current_user
      render text: current_user.email
    end
  end

  def index
    @sheets = Sheet.all
    render "layouts/application"
  end

end
