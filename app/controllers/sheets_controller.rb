class SheetsController < ApplicationController
  def index
    @sheets = Sheet.all
    render "sheets/Sheets"
  end
end
