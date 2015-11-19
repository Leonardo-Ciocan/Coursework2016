class Question < ActiveRecord::Base
  belongs_to :sheet
  self.inheritance_column = :ftype
  has_many :answers , dependent: :destroy
end
