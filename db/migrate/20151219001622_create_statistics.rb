class CreateStatistics < ActiveRecord::Migration
  def change
    create_table :statistics do |t|
      t.integer :question_id
      t.integer :answer_id
      t.string :data
      t.integer :kind
      t.timestamps
    end
  end
end
