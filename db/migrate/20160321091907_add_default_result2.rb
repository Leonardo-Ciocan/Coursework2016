class AddDefaultResult2 < ActiveRecord::Migration
  def change
    change_column_default :answers , :result , {"correct"=>"false" , "errors"=>[]}.to_json
  end
end
