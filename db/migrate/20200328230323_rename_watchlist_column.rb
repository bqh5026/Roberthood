class RenameWatchlistColumn < ActiveRecord::Migration[5.2]
  def change
    rename_column :watchlists, :investor_id, :user_id
  end
end
