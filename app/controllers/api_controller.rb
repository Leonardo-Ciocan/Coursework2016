class ApiController < ApplicationController
  skip_before_action :authenticate_user!

  def statistics_for_question
    question = Question.find params[:id]
    c = Statistic.joins(:answer).where(:answers => {:question_id => question.id}).group_by(&:kind)

    ostats = Hash.new

    c.each {
        |key,val|
      puts val
      stats = Hash.new { |h, k| h[k] = 0 }
      for i in val
        stats[i.data] += 1
      end
      ostats[key] = stats
    }


     render :json => ostats, status: 200
  end

  def questions
    render :json => Question.where(:sheet=>Sheet.find(params[:id]))
  end
end
