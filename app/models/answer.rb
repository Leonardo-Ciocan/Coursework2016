class Answer < ActiveRecord::Base
  belongs_to :question
  belongs_to :user

  @@stat_overall_clicks = 0
  @@stat_first_click = 1
  @@stat_change = 2

  def data=(val)
    puts self
    if self.question.type == 0
      if self.data == nil or self.data == ""
        #this means that this is their first choice
        Statistic.create :answer => self , :kind => @@stat_first_click , :data => val
      else
        Statistic.create :answer => self , :kind => @@stat_change , :data => {"from" => self.data , "to"=>val}.to_json.to_s
      end
    end

    write_attribute :data , val
  end
end
