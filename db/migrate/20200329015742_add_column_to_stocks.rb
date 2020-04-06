class AddColumnToStocks < ActiveRecord::Migration[5.2]
  def change
    add_column :stocks, :company_info, :text, null: false
  end
end
