require 'test_helper'

class AnswerTest < ActiveSupport::TestCase

  test "Cannot save answer without user id" do
    answer = Answer.new
    answer.question_id = 5

    begin
      answer.save
      assert false
    rescue
      assert true
    end
  end

  test "Cannot save answer without question id" do
    answer = Answer.new
    answer.user_id = 5

    begin
      answer.save
      assert false
    rescue
      assert true
    end
  end

end
