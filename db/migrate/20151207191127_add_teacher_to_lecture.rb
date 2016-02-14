class AddTeacherToLecture < ActiveRecord::Migration
  def change
    add_column :lectures ,:author_id , :integer
  end
end
