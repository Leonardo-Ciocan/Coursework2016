class AddRequiredColumns < ActiveRecord::Migration
  def change
    change_column :questions , :title , :string , :null => false
  end
end
