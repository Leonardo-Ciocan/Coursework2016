class SheetsController < ApplicationController
  before_action :authenticate_user!

  def index
    @lecture_id = params[:id]
    lecture = Lecture.find @lecture_id

    if lecture.author == current_user.id
      redirect_to "lectures/manage/" + @lecture_id
    end
    render "sheets/Sheets"
  end
end
