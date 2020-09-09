class CreateHeros < ActiveRecord::Migration[6.0]
  def change
    create_table :heros do |t|
      t.string :card_id
      t.string :dbf_id
      t.string :name
      t.string :player_class
      t.string :img

      t.timestamps
    end
  end
end
