class AddUniqueToWatchlistId < ActiveRecord::Migration[5.2]
  def change
    remove_column :stocks, :watchlist_id, :integer
  end
end
