class AddModelAnswerToSheet < ActiveRecord::Migration
  def change
    add_column :questions , :model_answer , :string
  end
end
