class AddResultToAnswer < ActiveRecord::Migration
  def change
    add_column :answers  , :result , :string
  end
end
