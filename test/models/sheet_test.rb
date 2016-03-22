require 'test_helper'

class SheetTest < ActiveSupport::TestCase

  test 'Cannot save sheet without name' do
    sheet = Sheet.new
    sheet.lecture_id = 0

    begin
      assert_not sheet.save
    rescue
      assert true
    end
  end

  test 'Cannot save sheet without lecture id' do
    sheet = Sheet.new
    sheet.name = ""

    begin
      assert_not sheet.save
    rescue
      assert true
    end
  end

end
