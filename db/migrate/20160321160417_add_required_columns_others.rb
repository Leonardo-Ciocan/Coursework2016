class AddRequiredColumnsOthers < ActiveRecord::Migration
  def change

    change_column :questions , :sheet_id , :integer , :null => false
    change_column :questions , :model_answer , :string , :null => false
    change_column :questions , :correct_answer , :string , :null => false
    change_column :questions , :type , :integer , :null => false
    change_column :questions , :data , :string , :null => false

    change_column :answers , :user_id , :integer , :null => false
    change_column :answers , :question_id , :integer , :null => false

    change_column_default :lectures , :color , "green"
    change_column :lectures , :name , :string , :null => false

    change_column :statistics , :answer_id , :integer , :null => false
    change_column :statistics , :data , :string , :null => false
    change_column :statistics , :kind , :integer , :null => false

    change_column :subscriptions , :lecture_id , :integer , :null => false
    change_column :subscriptions , :user_id , :integer , :null => false
  end
end
