class CreateCards < ActiveRecord::Migration[6.0]
  def change
    create_table :cards do |t|
      t.string :card_id
      t.string :dbf_id
      t.string :name
      t.string :card_set
      t.string :type
      t.string :rarity
      t.integer :cost
      t.string :player_class
      t.string :img
      t.string :mechanics

      t.timestamps
    end
  end
end
