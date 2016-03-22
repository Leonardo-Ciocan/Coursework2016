require 'test_helper'

class SubscriptionTest < ActiveSupport::TestCase

  test 'Cannot save subscription without lecture id' do
    subscription = Subscription.new
    subscription.user_id = 1


    begin
      subscription.save
      assert false
    rescue
      assert true
    end
  end

  test 'Cannot save subscription without user id' do
    subscription = Subscription.new
    subscription.lecture_id = 1


    begin
      subscription.save
      assert false
    rescue
      assert true
    end
  end

end
