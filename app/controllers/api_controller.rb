class ApiController < ApplicationController
  skip_before_action :authenticate_user!

  def subscribe
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
    lectures = Lecture.where(:author_id => current_user.id).map{
      |lecture|
      {
          "id" => lecture.id,
          "name" => lecture.name,
          "author" => User.find(lecture.author_id).email,
          "color" => lecture.color,
          "sheets" => Sheet.where(:lecture_id => lecture.id).count
      }
    }

    subscribed_to = Subscription.where(:user_id => current_user.id).map{
      |subscription|
          lecture = Lecture.find(subscription.lecture_id)
          {
            "id" => lecture.id,
            "name" => lecture.name,
            "author" => User.find(lecture.author_id).email,
            "color" => lecture.color,
            "sheets" => Sheet.where(:lecture_id => lecture.id).count
          }

    }

    render :json => {:subscribed => subscribed_to , :created=>lectures} , status: 200
  end

  def lecture
    lecture = Lecture.find(params[:id])
    render :json => {
               "id" => lecture.id,
               "name" => lecture.name,
               "author" => User.find(lecture.author_id).email,
               "color" => lecture.color,
               "sheets" => Sheet.where(:lecture_id => lecture.id).count
           } , status: 200
  end

  def sheets
    id = params[:id]
    lecture = Lecture.find id
    sheets = []
    if current_user.id == lecture.author_id
      sheets = Sheet.where(:lecture_id => id).map{
          |sheet|
        {
            "id" => sheet.id,
            "description" => sheet.description ,
            "name" => sheet.name,
            "live" => sheet.live
        }
      }
    else
      sheets = Sheet.where(:lecture_id => id , :live=>true).map{
          |sheet|
        {
            "id" => sheet.id,
            "description" => sheet.description ,
            "name" => sheet.name
        }
      }
    end

    render :json => sheets , status: 200
  end

  def create_sheet
    sheet = params[:sheet]

    errors = Hash.new { |h, k| h[k] = [] }
    for i , qs in params[:questions]
      if qs["title"] == ""
        errors[i].append("Can't have an empty question body" )
      end

      puts qs["type"]
      if qs["type"] == "0"
        if qs["correct_answer"] == "-1"
          errors[i].append("No answer was selected")
        end
      end
    end



    if errors.length != 0
      render :json => errors
    else
      new_sheet = Sheet.create :description=>sheet["description"] ,
                               :name => sheet["name"] ,
                               :lecture_id => params[:lecture_id]
      for i,v in params[:questions]
        puts i
        Question.create :title => v["title"] ,
                        :subtitle => v["subtitle"] ,
                        :data => v["data"],
                        :correct_answer => v["correct_answer"],
                        :type => v["type"],
                        :sheet_id => new_sheet.id
      end
      head :ok
    end

  end

  def update_sheet
    sheet = Sheet.find params[:sheet]

    if params.has_key?("name")
      sheet.name = params[:name]
      sheet.save
    end

    if params.has_key?("live")
      sheet.live = params[:live]
      sheet.save
    end

    head :ok
  end

  def create_lecture
    lecture = Lecture.create :name => params[:name] , :color => params[:color] , :author_id=>current_user.id
    render text: lecture.id
  end


  def delete_sheet
    Sheet.find(params[:sheet]).delete
    render :nothing => 200
  end

  def lecture_users_count
    users = Subscription.where(:lecture_id => params[:id]).count
    render :text => users
  end

  def update_lecture
    lecture = Lecture.find params[:lecture_id]
    if params.has_key?("name")
      lecture.name = params[:name]
      lecture.save
    end

    if params.has_key?("color")
      lecture.color = params[:color]
      lecture.save
    end

    render :nothing => 200
  end

end