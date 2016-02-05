class SheetCreatorController < ApplicationController
  def index
    @lecture_id = params[:id]
    render "sheet_creator/SheetCreator"
  end
end
