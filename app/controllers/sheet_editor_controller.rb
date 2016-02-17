require 'net/http'
require 'json'

class SheetEditorController < ApplicationController
  before_action :authenticate_user!

  @@stat_overall_clicks = 0
  @@stat_first_click = 1
  @@stat_current_click = 2

  @@evalyn_url = URI.parse("http://188.166.154.242:1989/check")

  def index

    @sheet = Sheet.find params[:id]
    @lecture_id = @sheet.lecture_id
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


    if answer.question.type == 0
      if answer.data == nil
        #this means that this is their first choice
        Statistic.create :answer => answer , :kind => @@stat_first_click , :data => params[:data]
      else
        #this is for overall clicks
        #TODO: is this useful
        Statistic.create :answer => answer, :kind=> @@stat_overall_clicks , :data => params[:data]
      end
    end

    answer.data = params[:data]
    answer.save

    if answer.question.type == 3
      inputs = JSON.parse(answer.question.data)["inputs"]
      outputs = JSON.parse(answer.question.correct_answer)
      code = answer.data
      http = Net::HTTP.new(@@evalyn_url.host, @@evalyn_url.port)
        header = {'Content-Type' => 'text/json'}
        request = Net::HTTP::Post.new(@@evalyn_url.request_uri, header)
        puts request.method
        request.set_form_data( {'code' => code.to_s , "inputs" => inputs , "outputs"=>outputs})
        response = http.request(request)
        resp =  response.body

      puts answer.question.data
      puts "inputs: " + inputs.to_s
      puts "outputs: " + outputs.to_s
      puts resp
      render :text => resp
      return
    end



    head :ok , content_type: "text/html"
  end
end
