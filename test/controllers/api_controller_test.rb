require 'test_helper'

class ApiControllerTest < ActionController::TestCase
  include Devise::TestHelpers

  test 'Test updating sheet sheet' do
    sign_in User.first

    lecture = Lecture.new
    lecture.name = 'Lecture'
    lecture.author_id = User.first.id
    lecture.save

    sheet = Sheet.new
    sheet.name = "A"
    sheet.live = false
    sheet.released = false
    sheet.lecture_id = lecture.id
    sheet.save

    post :update_sheet ,{
             :sheet => sheet.id,
             :name => "B",
             :live => "true",
             :released =>"true"
                       }
    assert_response :ok

    sheet = Sheet.find sheet.id

    assert sheet.name == "B"
    assert sheet.live
    assert sheet.released

  end

  test 'Cannot update sheet if not author of lecture' do
    sign_in User.first

    lecture = Lecture.new
    lecture.name = 'Lecture'
    lecture.author_id = 22
    lecture.save

    sheet = Sheet.new
    sheet.name = "A"
    sheet.live = false
    sheet.released = false
    sheet.lecture_id = lecture.id
    sheet.save

    post :update_sheet ,{
                           :sheet => sheet.id,
                           :name => "B",
                           :live => "true",
                           :released =>"true"
                       }

    assert_response :forbidden
  end

  test 'Cannot get full sheet if user is not author or subscribed' do
    sign_in User.first

    lecture = Lecture.new
    lecture.name = 'Lecture'
    lecture.author_id = 22
    lecture.save

    sheet = Sheet.new
    sheet.name = "A"
    sheet.live = false
    sheet.released = false
    sheet.lecture_id = lecture.id
    sheet.save

    post :full_sheet , {:lecture_id => lecture.id,
                        :sheet_id => sheet.id}

    assert_response :forbidden
  end

end
