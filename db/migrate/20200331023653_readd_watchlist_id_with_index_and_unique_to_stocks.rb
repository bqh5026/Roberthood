class ReaddWatchlistIdWithIndexAndUniqueToStocks < ActiveRecord::Migration[5.2]
  def change
    add_column :stocks, :watchlist_id, :integer
    add_index :stocks, :watchlist_id, unique: true
  end
end
