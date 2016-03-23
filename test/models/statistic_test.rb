require 'test_helper'

class StatisticTest < ActiveSupport::TestCase

  test 'Cannot save statistic without kind' do
    statistic = Statistic.new
    statistic.answer_id = 0
    statistic.data = ""


    begin
      statistic.save
      assert false
    rescue
      assert true
    end
  end

  test 'Cannot save statistic without answer id' do
    statistic = Statistic.new
    statistic.kind = 0
    statistic.data = ''


    begin
      statistic.save
      assert false
    rescue
      assert true
    end
  end

  test 'Cannot save statistic without data' do
    statistic = Statistic.new
    statistic.answer_id = 0
    statistic..kind = 0


    begin
      statistic.save
      assert false
    rescue
      assert true
    end
  end

  # test 'Statistic is created when new multiple choice is first chosen' do
  #   question = Question.new :type => 0 ,
  #                           :title=>"Title" ,
  #                           :data=>"",
  #                           :correct_answer=>"",
  #                           :model_answer=>"",
  #                           :sheet_id => 0
  #
  #   answer = Answer.new :user_id =>0,
  #                       :question => question,
  #                       :question_id =>question.id
  #
  #   answer.data = 'Something else'
  #
  #
  #   assert Statistic.where(:answer_id => answer.id).count == 1
  #
  # end
  #
  # test 'Statistic is created when a multiple choice is transitioned from one answer to another' do
  #   question = Question.new :type => 0 ,
  #                           :title=>"Title" ,
  #                           :data=>"",
  #                           :correct_answer=>"",
  #                           :model_answer=>"",
  #                           :sheet_id => 0
  #
  #   answer = Answer.new :user_id =>0,
  #                       :question => question,
  #                       :question_id =>question.id
  #
  #   answer.data = "Something"
  #
  #   answer.data = 'Something else'
  #
  #   answer.data = 'Another'
  #
  #
  #   assert Statistic.where(:kind => 2 ,:answer_id => answer.id).count == 2
  #
  # end

end
