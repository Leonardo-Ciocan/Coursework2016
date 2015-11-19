class AddAnswerColumns < ActiveRecord::Migration
  def change
    add_reference :answers , :user
    add_reference :answers , :question
  end
end
