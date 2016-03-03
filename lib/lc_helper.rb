module LCHelper
  def valid?(answer)
    puts "validity:"
    puts ">>> " + (answer.data == answer.question.correct_answer).to_s
    if answer.question.type == 0 or answer.question.type == 1
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

    q2 = Question.create :type => 1, :title => "Write down the best data structure" , :sheet_id => sheet.id , :correct_answer => "queue"

    for i in 0..20
      a = Answer.create :question_id => q2.id
      a.data = ["stack","queue","Potato kernel", "Circular queue"][(rand * 3).round]
      a.save
    end


  end


  def mutate_data
    for i in Answer.all
      puts i.question.type
      if i.question.type == 0
        i.data = (rand * 2).round.to_s
        i.save
      end
    end
  end
end