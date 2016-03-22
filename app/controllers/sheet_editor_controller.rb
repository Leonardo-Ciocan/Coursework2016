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
    @sheet_id = @sheet.id
    @questions = @sheet.questions.all
    @answers = []
    for qs in @questions
      item = Answer.find_or_create_by(user:current_user , question:qs)
      puts item.id
      @answers.push item
    end
    render "sheet_editor/SheetEditor"
  end

  def update_answer
    answer = Answer.find params[:id]

    puts answer.id

    answer.update_attribute :data , params[:data]
    puts answer.save
    puts answer.valid?

    #puts answer.data + " vs " + params[:data]

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
      answer.result = resp
      answer.save
      render :json => resp
      return
    end



    head :ok
  end
end
