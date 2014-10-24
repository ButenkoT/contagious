class CreateGameBoards < ActiveRecord::Migration
  def change
    create_table :game_boards do |t|
      t.string :title
      t.timestamps
    end
  end
end
