class AddTeacherToLecture < ActiveRecord::Migration
  def change
    add_column :lectures ,:author , :users
  end
end
