class Question < ActiveRecord::Base
  belongs_to :sheet
  has_many :answers , dependent: :destroy
end
