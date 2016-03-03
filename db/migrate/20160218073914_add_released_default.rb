class AddReleasedDefault < ActiveRecord::Migration
  def change
    change_column_default :sheets , :released , false
  end
end
