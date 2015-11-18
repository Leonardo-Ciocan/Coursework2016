class Sheet < ActiveRecord::Base
  validates :name , :presence => true
  has_many :questions , dependent: :destroy
end
