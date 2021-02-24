class CreateStocks < ActiveRecord::Migration[5.2]
  def change
    create_table :stocks do |t|
      t.string :ticker, null: false
      t.index :ticker, unique: true
      t.integer :investor_id, null: false
      t.index :investor_id, unique: true
      t.string :company_name, null: false
      t.index :company_name, unique: true
      t.decimal :stock_price, :precision => 2
      t.integer :watchlist_id
      t.index :watchlist_id

      t.timestamps
    end
  end
end
