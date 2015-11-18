class CreateSheets < ActiveRecord::Migration
  def change
    create_table :sheets do |t|
      t.string :name , :null => false
      t.string :description

      t.timestamps
    end
  end
end
