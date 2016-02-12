class SheetsController < ApplicationController
  before_action :authenticate_user!

  def index
    @lecture_id = params[:id]
    render "sheets/Sheets"
  end
end
