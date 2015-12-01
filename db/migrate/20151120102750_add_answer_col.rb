class AddAnswerCol < ActiveRecord::Migration
  def change
    add_column :questions , :correct_answer , :string
  end
end
