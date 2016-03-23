class AddRequiredColumnToSheet < ActiveRecord::Migration
  def change
    change_column :sheets , :name , :string , :null => false
  end
end
