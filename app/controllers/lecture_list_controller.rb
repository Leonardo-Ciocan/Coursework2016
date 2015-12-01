class LectureListController < ApplicationController

  def index
    @lectures = Lecture.all
    render 'lecture_list/LectureList'
  end
end
