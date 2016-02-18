class Answer < ActiveRecord::Base
  belongs_to :question
  belongs_to :user

  @@stat_overall_clicks = 0
  @@stat_first_click = 1
  @@stat_current_click = 2

  def data=(val)
    puts self
    if self.question.type == 0
      if self.data == nil
        #this means that this is their first choice
        Statistic.create :answer => self , :kind => @@stat_first_click , :data => val
      else
        #this is for overall clicks
        #TODO: is this useful
        Statistic.create :answer => self, :kind=> @@stat_overall_clicks , :data => val
      end
    end
  end
end
