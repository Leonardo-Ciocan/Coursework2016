class AddReleasedToSheet < ActiveRecord::Migration
  def change
    add_column :sheets , :released , :boolean
  end
end
