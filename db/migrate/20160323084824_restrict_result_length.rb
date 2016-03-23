class RestrictResultLength < ActiveRecord::Migration
  def change
    change_column :answers , :result , :string , :limit => 512
  end
end
