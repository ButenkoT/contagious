class AddPlayerIdToGameBoards < ActiveRecord::Migration
  def change
    add_column :game_boards, :player_id, :integer
    add_index :game_boards, :player_id
  end
end
    