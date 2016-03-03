module LCHelper
  def valid?(answer)
    if answer.question.type == 0
      return answer.data == answer.question.correct_answer
    end
  end


  def create_dummy_data
    lecture = Lecture.create :name => "Algorithms" , :color => "red" , :author_id => 1

    # for i in 0..35
    #   Lecture.create :name => "Lecture " + i  , :color => "%06x" % (rand * 0xffffff) , :user_id => 1
    # end

    sheet = Sheet.create :name => "Stacks and Trees" , :lecture_id => lecture.id

    q1 = Question.create :type => 0, :title => "What is the best data structure?" , :sheet_id => sheet.id , :data => {"answers" => ["Stack" , "Linked list" , "Queue"]}.to_json.to_s , :correct_answer => "1"

    for i in 0..20
      a = Answer.create :question_id => q1.id
      a.data = (rand * 2).round().to_s
      a.save

      Statistic.create :answer_id => a.id , :data => a.data , :kind => 1 ,:question_id => q1.id
    end


  end
end