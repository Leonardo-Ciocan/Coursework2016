class SheetEditorController < ApplicationController
  before_action :authenticate_user!

  @@stat_overall_clicks = 0

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
    puts(answer.question.type)

    if answer.question.type == 0
      Statistic.create :answer => answer, :kind=> @@stat_overall_clicks , :data=>answer.data
    end

    head :ok , content_type: "text/html"
  end
end
