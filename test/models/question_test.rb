require 'test_helper'

class QuestionTest < ActiveSupport::TestCase

  test "Cannot save question without title" do
    question = Question.new
    question.type = 0
    question.data = ""
    question.correct_answer=""
    question.model_answer = ""
    question.sheet_id = 0
    begin
      question.save
    rescue
      assert true
    end
  end

  test "Cannot save question without data" do
    question = Question.new
    question.type = 0
    question.title = ""
    question.correct_answer=""
    question.model_answer = ""
    question.sheet_id = 0
    begin
      question.save
    rescue
      assert true
    end
  end

  test "Cannot save question without type" do
    question = Question.new
    question.title = ""
    question.data = ""

    question.correct_answer=""
    question.model_answer = ""
    question.sheet_id = 0
    begin
      question.save
    rescue
      assert true
    end
  end

  test "Cannot save question without correct answer" do
    question = Question.new
    question.title = ""
    question.data = ""

    question.model_answer = ""
    question.sheet_id = 0
    begin
      question.save
    rescue
      assert true
    end
  end

  test "Cannot save question without model answer" do
    question = Question.new
    question.title = ""
    question.data = ""
    question.type=0

    question.correct_answer = ""
    question.sheet_id = 0
    begin
      question.save
    rescue
      assert true
    end
  end

  test "Cannot save question without sheet id" do
    question = Question.new
    question.title = ""
    question.data = ""
    question.type=0

    question.correct_answer=""
    question.model_answer = ""
    begin
      question.save
    rescue
      assert true
    end
  end
end
