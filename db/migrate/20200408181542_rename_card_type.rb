class RenameCardType < ActiveRecord::Migration[6.0]
  def change
    rename_column :cards, :type, :card_type
  end
end
