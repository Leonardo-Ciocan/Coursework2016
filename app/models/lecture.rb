class Lecture < ActiveRecord::Base
  belongs_to :user , :foreign_key => "author"
end
