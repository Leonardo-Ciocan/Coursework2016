class SheetCreatorController < ApplicationController
  before_action :authenticate_user!

  def index
    @lecture_id = params[:id]
    render "sheet_creator/SheetCreator"
  end
end
