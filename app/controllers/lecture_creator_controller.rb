class LectureCreatorController < ApplicationController
  before_action :authenticate_user!

  def index
    render "lecture_creator/LectureCreator"
  end
end
