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
    statistic.data = ""


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

end
