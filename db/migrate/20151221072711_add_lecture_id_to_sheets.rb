class AddLectureIdToSheets < ActiveRecord::Migration
  def change
    add_column :sheets , :lecture_id , :integer
  end
end
