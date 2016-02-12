class SheetDashboardController < ApplicationController
  def index
    @sheet = Sheet.find(params[:id])
    @answers = Answer.joins(:question).where(:questions => {:sheet_id=>params[:id]})
    @data = @answers.group_by(&:question_id) #Hash[@answers.map {|answer| [answer.question_id , answer] }]
    @lecture_id = @sheet.lecture_id
    render 'sheet_dashboard/SheetDashboard'
  end
end
