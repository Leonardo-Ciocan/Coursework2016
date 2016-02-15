class LectureListController < ApplicationController
  before_action :authenticate_user!

  def index
    @lectures = Lecture.all
    render 'lecture_list/LectureList'
  end

  def subscribe
    @lecture_id = params[:id]
    lecture = Lecture.find @lecture_id
    if lecture.author_id = current_user.id or Subscription.where(:user_id => current_user.id).count > 0
      redirect_to "/lectures/" + @lecture_id
      return
    end
    render 'lecture_list/Subscribe'
  end
end
