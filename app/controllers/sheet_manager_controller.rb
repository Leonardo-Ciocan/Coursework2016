class SheetManagerController < ApplicationController
  before_action :authenticate_user!

  def index
    @lecture_id = params[:id]
    render "sheet_manager/SheetManager"
  end
end
