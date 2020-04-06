class RemoveColumnFromWatchlists < ActiveRecord::Migration[5.2]
  def change
    remove_column :watchlists, :portfolio_id
  end
end
