class AddDefaultAnswer < ActiveRecord::Migration
  def change
    change_column_default :answers , :data , ''

  end
end
