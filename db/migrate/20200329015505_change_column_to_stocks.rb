class ChangeColumnToStocks < ActiveRecord::Migration[5.2]
  def change
    remove_column :stocks, :company_info
  end
end
