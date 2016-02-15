module LCHelper
  def valid?(answer)
    if answer.question.type == 0
      return answer.data == answer.question.correct_answer
    end
  end
end