class AddColumnToWatchlists < ActiveRecord::Migration[5.2]
  def change
    add_column :watchlists, :portfolio_id, :integer
    add_index :watchlists, :portfolio_id, unique: true
  end
end
