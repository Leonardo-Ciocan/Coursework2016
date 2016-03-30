class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception

  def current
    if current_user
      render text: current_user.email
    end
  end

  def index
    render "layouts/index"
  end

end
