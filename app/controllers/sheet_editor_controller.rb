class SheetEditorController < ApplicationController
  def index
    @sheet = Sheet.find params[:id]
    @questions = @sheet.questions.all
    render "sheet_editor/SheetEditor"
  end
end
