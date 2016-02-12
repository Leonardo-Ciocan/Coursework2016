class LectureListController < ApplicationController
  before_action :authenticate_user!

  def index
    @lectures = Lecture.all
    render 'lecture_list/LectureList'
  end

  def subscribe
    @lecture_id = params[:id]
    render 'lecture_list/Subscribe'
  end
end
