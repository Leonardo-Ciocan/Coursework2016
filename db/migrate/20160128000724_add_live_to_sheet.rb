class AddLiveToSheet < ActiveRecord::Migration
  def change
    add_column :sheets , :live , :boolean
  end
end
