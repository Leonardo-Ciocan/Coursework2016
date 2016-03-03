require "lc_helper"
include LCHelper

namespace :core do
  desc "TODO"
  task recreate: :environment do
    LCHelper.create_dummy_data
  end
  task mutate: :environment do
    LCHelper.mutate_data
  end
end
