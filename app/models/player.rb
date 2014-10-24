# == Schema Information
#
# Table name: players
#
#  id         :integer          not null, primary key
#  nickname   :string(255)
#  score      :integer
#  healthbar  :integer
#  created_at :datetime
#  updated_at :datetime
#

class Player < ActiveRecord::Base
  has_secure_password
  has_many :game_boards

  validates :nickname, :presence => true, :uniqueness => true, :length => {:minimum => 2}
  validates :email, :presence => true, :uniqueness => true
end
