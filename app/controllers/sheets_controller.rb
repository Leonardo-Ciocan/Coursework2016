class SheetsController < ApplicationController
  def index
    @lecture_id = params[:id]
    render "sheets/Sheets"
  end
end
