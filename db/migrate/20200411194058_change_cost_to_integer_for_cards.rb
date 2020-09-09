class ChangeCostToIntegerForCards < ActiveRecord::Migration[6.0]
  def change
    change_column :cards, :cost, :integer
  end
end
