class CreateWatchlists < ActiveRecord::Migration[5.2]
  def change
    create_table :watchlists do |t|
      t.string :name, null: false
      t.integer :investor_id, null: false
      t.index :investor_id, unique: true

      t.timestamps

    end
  end
end
