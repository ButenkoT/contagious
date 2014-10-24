# == Schema Information
#
# Table name: cells
#
#  id         :integer          not null, primary key
#  type       :integer
#  created_at :datetime
#  updated_at :datetime
#

class Cell < ActiveRecord::Base
  belongs_to :game_board
  
end
