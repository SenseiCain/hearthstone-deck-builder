class AddRaceToCards < ActiveRecord::Migration[6.0]
  def change
    add_column :cards, :race, :string
  end
end
