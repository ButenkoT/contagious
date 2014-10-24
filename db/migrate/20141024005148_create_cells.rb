class CreateCells < ActiveRecord::Migration
  def change
    create_table :cells do |t|
      t.integer :type
      t.timestamps
    end
  end
end
