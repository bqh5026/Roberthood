class ChangeColumnNullToStocks < ActiveRecord::Migration[5.2]
  def change
    change_column_null :stocks, :company_info, true
  end
end
