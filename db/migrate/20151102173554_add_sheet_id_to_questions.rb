class AddSheetIdToQuestions < ActiveRecord::Migration
  def change
    add_column :questions , :sheet_id , :integer
  end
end
