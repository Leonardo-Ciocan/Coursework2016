class SheetEditorController < ApplicationController
  before_action :authenticate_user!

  def index
    @sheet = Sheet.find params[:id]
    @questions = @sheet.questions.all
    @answers = []
    for qs in @questions
      item = Answer.find_or_create_by(user:current_user , question:qs)
      @answers.push item
    end
    render "sheet_editor/SheetEditor"
  end

  def update_answer
    answer = Answer.find params[:id]
    answer.data = params[:data]
    answer.save
    head :ok , content_type: "text/html"
  end
end
