class ApiController < ApplicationController
  skip_before_action :authenticate_user!

  def subscribe
    print current_user
    Subscription.create :lecture_id => params[:lecture_id] , :user_id => current_user.id
    head :ok
  end

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

  def completions
    question = Question.find params[:id]

    answers = Answer.where(:question => question).map{|answer| answer.data == question.correct_answer}

    render :json => answers , status: 200
  end
``
  def lectures
    lectures = Lecture.all.map{
      |lecture|
      {
          "id" => lecture.id,
          "name" => lecture.name,
          "author" => User.find(lecture.author).email,
          "color" => lecture.color
      }
    }
    render :json => lectures , status: 200
  end

  def lecture
    lecture = Lecture.find(params[:id])
    render :json => {
               "id" => lecture.id,
               "name" => lecture.name,
               "author" => User.find(lecture.author).email,
               "color" => lecture.color
           } , status: 200
  end

  def sheets
    id = params[:id]
    sheets = Sheet.where(:lecture_id => id).map{
        |sheet|
      {
          "id" => sheet.id,
          "description" => sheet.description ,
          "name" => sheet.name
      }
    }



    render :json => sheets , status: 200
  end

  def create_sheet
    sheet = params[:sheet]
    new_sheet = Sheet.create :description=>sheet["description"] , :name => sheet["name"]
    for i,v in params[:questions]
      puts i
      Question.create :title => v["title"] ,
                      :subtitle => v["subtitle"] ,
                      :data => v["data"],
                      :sheet_id => new_sheet.id
    end
    head :ok
  end

end
