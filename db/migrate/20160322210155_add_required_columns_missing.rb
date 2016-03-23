class AddRequiredColumnsMissing < ActiveRecord::Migration
  def change
    change_column :sheets , :lecture_id , :integer , :null => false
    change_column :lectures , :author_id , :integer , :null =>  false
  end
end
