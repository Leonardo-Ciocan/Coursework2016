class NewDefaultsSheet < ActiveRecord::Migration
  def change
    change_column_default :sheets , :live , false
  end
end
