require 'test_helper'

class LectureTest < ActiveSupport::TestCase
  test 'Cannot save lecture without name' do
    lecture = Lecture.new
    lecture.author_id = 1

    begin
      lecture.save
      assert false
    rescue
      assert true
    end
  end

  test 'Cannot save lecture without author id' do
    lecture = Lecture.new
    lecture.name = 'Lecture'

    begin
      lecture.save
      assert false
    rescue
      assert true
    end
  end
end
