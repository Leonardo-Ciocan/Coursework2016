class CreateQuestions < ActiveRecord::Migration
  def change
    create_table :questions do |t|
      t.string :title
      t.string :subtitle
      t.string :data
      t.integer :type
      t.timestamps
    end

  end
end
