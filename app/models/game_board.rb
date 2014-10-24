# == Schema Information
#
# Table name: game_boards
#
#  id         :integer          not null, primary key
#  title      :string(255)
#  created_at :datetime
#  updated_at :datetime
#

class Game_board < ActiveRecord::Base
  belongs_to :player
  has_many :cells
end
