class SheetsController < ApplicationController
  before_action :authenticate_user!

  def index
    @lecture_id = params[:id]
    lecture = Lecture.find @lecture_id

    if Subscription.where(:user_id => current_user.id).empty? and
        Lecture.find(@lecture_id).author_id != current_user.id
      redirect_to "/lectures/"
      return
    end

    if lecture.author_id == current_user.id
      redirect_to "/lectures/manage/" + @lecture_id
      return
    end
    render "sheets/Sheets"
  end
end
