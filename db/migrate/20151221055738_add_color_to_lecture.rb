class AddColorToLecture < ActiveRecord::Migration
  def change
    add_column :lectures, :color, :string
  end
end
