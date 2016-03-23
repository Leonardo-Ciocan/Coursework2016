class Question < ActiveRecord::Base
  belongs_to :sheet
  self.inheritance_column = :ftype
  has_many :answers , dependent: :destroy
  validate :validate_answer_type

  def validate_answer_type

    if type == 0
      begin
        json = JSON.parse(self.data)
        if json['choices'] == nil
          self.errors.add(:data , 'Data is malformed')
        end
      rescue
        self.errors.add(:data , "Not JSON")
      end
    end
  end
end
