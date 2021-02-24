class AddCompanyInfoToStocks < ActiveRecord::Migration[5.2]
  def change
    add_column :stocks, :company_info, :text
  end
end
