require 'lc_helper'

require 'levenshtein'
#Copyright (c) 2009, Schuyler Erle. All rights reserved.

# * Redistributions of source code must retain the above copyright notice,
# this list of conditions and the following disclaimer.
#
# * Redistributions in binary form must reproduce the above copyright notice,
#this list of conditions and the following disclaimer in the documentation
# and/or other materials provided with the distribution.
# THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS 'AS IS' AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING,
# BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT
# SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
# DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS
# INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
# (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY
# OF SUCH DAMAGE.

class ApiController < ApplicationController
  include LCHelper

  before_filter :check_auth


  def check_auth
    if current_user != nil
      return
    end

    authenticate_or_request_with_http_basic do |username,password|
      resource = User.find_by_email(username)
      if resource.valid_password?(password)
        sign_in :user, resource
      end
    end
  end

  def subscribe
    Subscription.create :lecture_id => params[:lecture_id] ,
                        :user_id    => current_user.id
    head :ok
  end

  def statistics_for_question
    question = Question.find params[:id]
    c = Statistic.joins(:answer)
            .where(:answers => {:question_id => question.id})
            .group_by(&:kind)

    ostats = Hash.new

    c.each {
        |key,val|
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

    answers = Answer.where(:question => question)
                  .map{
                    |answer|
                    answer.data == question.correct_answer
                  }

    render :json => answers , status: 200
  end

  def lectures
    lectures = Lecture.where(:author_id => current_user.id).map{
      |lecture|
      {
          'id'     => lecture.id,
          'name'   => lecture.name,
          'author' => User.find(lecture.author_id).email,
          'color'  => lecture.color,
          'sheets' => Sheet.where(:lecture_id => lecture.id).count
      }
    }

    subscribed_to = Subscription.where(:user_id => current_user.id).map{
      |subscription|
          lecture = Lecture.find(subscription.lecture_id)
          {
            'id'     => lecture.id,
            'name'   => lecture.name,
            'author' => User.find(lecture.author_id).email,
            'color'  => lecture.color,
            'sheets' => Sheet.where(:lecture_id => lecture.id).count
          }

    }

    render :json => {:subscribed => subscribed_to , :created=>lectures} , status: 200
  end

  def lecture
    lecture = Lecture.find(params[:id])
    render :json => {
               'id'     => lecture.id,
               'name'   => lecture.name,
               'author' => User.find(lecture.author_id).email,
               'color'  => lecture.color,
               'sheets' => Sheet.where(:lecture_id => lecture.id).count
           } , status: 200
  end

  def full_sheet
    lecture = Lecture.find(params[:lecture_id])

    if Subscription.where(:user_id => current_user.id).empty? and
        lecture.author_id != current_user.id
      head :forbidden
      return
    end

    lecture_json = {
               'id'     => lecture.id,
               'name'   => lecture.name,
               'author' => User.find(lecture.author_id).email,
               'color'  => lecture.color
    }

    sheet = Sheet.find(params[:sheet_id])
    sheet_json = {
        'id' => sheet.id,
        'name' => sheet.name,
        'released' => sheet.released
    }

    questions = sheet.questions.all
    answers = []
    for qs in questions
      item = Answer.find_or_create_by(user:current_user , question:qs)
      answers.push item
    end

    modelAnswers = questions.map{
      |question|
        {
            'data' => question.model_answer,
            'id' => question.id
        }
    }

    correct = answers.count {
      |answer|
      JSON.parse(answer.result)["correct"].to_s == "true"
    }

    puts "\n" , correct , "\n"

    percentage = ((correct.fdiv answers.count) * 100.0).round
    render :json => {
               'lecture'      => lecture_json,
               'sheet'        => sheet_json,
               'questions'    => questions,
               'answers'      => answers,
               'modelAnswers' => modelAnswers,
               'percentage'   => percentage
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
            'id'          => sheet.id,
            'description' => sheet.description ,
            'name'        => sheet.name,
            'live'        => sheet.live,
            'released'    => sheet.released
        }
      }
    else
      sheets = Sheet.where(:lecture_id => id , :live=>true).map{
          |sheet|
        {
            'id'          => sheet.id,
            'description' => sheet.description ,
            'name'        => sheet.name
        }
      }
    end

    render :json => sheets , status: 200
  end

  def create_sheet
    sheet = params[:sheet]

    errors = Hash.new { |h, k| h[k] = [] }
    for i , qs in params[:questions]
      if qs['title'] == ''
        errors[i].append("Can't have an empty question body" )
      end

      puts qs['type']
      if qs['type'] == '0'
        if qs['correct_answer'] == '-1'
          errors[i].append('No answer was selected')
        end
      elsif qs['type'] == '1'
        if qs['model_answer'] == ''
          errors[i].append('Enter a model answer for this question' )
        end

        regex = Regexp.new qs['correct_answer']
        if (qs['model_answer'] =~ regex).nil?
          errors[i].append('Model answer does not match regex' )
        end
      elsif qs['type'] == '3'
        inputs = JSON.parse(qs['data'])['inputs']
        outputs = JSON.parse(qs['correct_answer'])

        if inputs.count != outputs.count or inputs.count == 0
          errors[i].append('You need to have tests for this question')
        end
      end
    end

    if sheet['name'] == ''
      errors[-1].append('The sheet needs a name')
    end

    if errors.length != 0
      render :json => errors
    else
      new_sheet = Sheet.create :description => sheet['description'] ,
                               :name        => sheet['name'] ,
                               :lecture_id  => params[:lecture_id]
      for i,v in params[:questions]
        puts i
        Question.create :title          => v['title'] ,
                        :subtitle       => v['subtitle'] ,
                        :data           => v['data'],
                        :correct_answer => v['correct_answer'],
                        :type           => v['type'],
                        :sheet_id       => new_sheet.id,
                        :model_answer   => v['model_answer']
      end
      head :ok
    end
  end

  def update_sheet
    sheet = Sheet.find params[:sheet]

    if sheet.lecture.author_id != current_user.id
      head :forbidden
      return
    end

    if params.has_key?('name')
      sheet.name = params[:name]
      sheet.save
    end

    if params.has_key?('live')
      sheet.live = params[:live] == 'true'
      sheet.save
    end

    if params.has_key?('released')
      sheet.released = params[:released] == 'true'
      sheet.save
    end

    head :ok
  end

  def create_lecture
    lecture = Lecture.create :name      => params[:name] ,
                             :color     => params[:color] ,
                             :author_id => current_user.id
    render text: lecture.id
  end


  def delete_sheet
    s = Sheet.find(params[:sheet])

    if s.lecture.author_id != current_user.id
      head :forbidden
      return
    end

    s.delete

    render :nothing => 200
  end

  def delete_lecture
    lecture = Lecture.find(params[:lecture_id])
    if lecture.author_id != current_user.id
      head :forbidden
      return
    end
    lecture.delete
    render :nothing => 200
  end

  def lecture_users_count
    users = Subscription.where(:lecture_id => params[:id]).count
    render :text => users
  end

  def update_lecture
    lecture = Lecture.find params[:lecture_id]
    if params.has_key?('name')
      lecture.name = params[:name]
      lecture.save
    end

    if params.has_key?('color')
      lecture.color = params[:color]
      lecture.save
    end

    render :nothing => 200
  end

  def release_sheet
    sheet = Sheet.find params[:id]
    sheet.released = params[:released] == 'true'
    sheet.save
    head :ok
  end

  def stats
    question = Question.find(params[:question_id])
    answers = Answer.where(:question_id => params[:question_id])

    if question.type == 0
      wrong = 0
      counters = Hash.new { |h, k| h[k] = 0 }

      percentage = 0
      sum = 0
      for i in answers
        if i.data == i.question.correct_answer
          sum += 1
        end

        for word in i.data.split ' '
          counters[word] += 1
        end
      end
      percentage = (sum.fdiv answers.size) * 100.0
      #correct = sum
      wrong = answers.size - sum

      c = Statistic.joins(:answer).where(:answers => {:question_id => question.id}).where(:kind => 2).map{
          |stat|
        JSON.parse(stat.data)
      }

      transitions = Hash.new { |h, k| h[k] = Hash.new { |h, k| h[k] = 0 } }
      c.each{
          |transition|
        transitions[transition['from']][transition['to']] += 1
      }

      distances = {}
      if question.type == 1

        distances = answers.map{
            |answer|
          Levenshtein.distance(question.correct_answer,answer.data)
        }.each_with_object(Hash.new(0)) { |word,counts| counts[word] += 1 }

      end


      render :json => {
                 'percentage'   => percentage,
                 'correct'      => sum,
                 'wrong'        => wrong,
                 'transitions'  => transitions,
                 'counters'     => counters,
                 'distances'    => distances
             }
    elsif question.type == 3
      wrong = 0
      counters = Hash.new { |h, k| h[k] = 0 }

      percentage = 0
      sum = 0
      for i in answers
        if JSON.parse(i.result)["correct"] == "true"
          sum += 1
        end
      end
      percentage = (sum.fdiv answers.size) * 100.0
      if percentage.nan?
        percentage = 0
      end
      #correct = sum
      wrong = answers.size - sum



      render :json => {
                 'percentage'   => percentage,
                 'correct'      => sum,
                 'wrong'        => wrong,
                 'counters'     => counters
             }
    end


  end


  def search
    puts 'searching'
    query = params[:query]

    sheets = Sheet.where('lower(name) like ?', '%'+query+'%').map{
        |sheet|
        l = Lecture.find(sheet.lecture_id)
        {:id => sheet.id , :name=>sheet.name , :lecture=> {:title=>l.name ,:color=>l.color}}
    }.first(5)

    lectures = Lecture.where('lower(name) like ?', '%'+query+'%').map{
      |lecture|
      {:id => lecture.id , :name => lecture.name , :color => lecture.color}
    }.first(5)

    render :json => {
               'sheets'   => sheets,
               'lectures' => lectures
           }
  end

  def userinfo
    render :json => {
               "email" => current_user.email
           }
  end

end