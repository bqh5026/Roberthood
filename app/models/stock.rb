# == Schema Information
#
# Table name: stocks
#
#  id           :bigint           not null, primary key
#  company_info :text             not null
#  company_name :string           not null
#  stock_price  :decimal(2, )
#  ticker       :string           not null
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#  investor_id  :integer          not null
#  portfolio_id :integer
#  watchlist_id :integer
#
# Indexes
#
#  index_stocks_on_company_name  (company_name) UNIQUE
#  index_stocks_on_investor_id   (investor_id) UNIQUE
#  index_stocks_on_portfolio_id  (portfolio_id) UNIQUE
#  index_stocks_on_ticker        (ticker) UNIQUE
#  index_stocks_on_watchlist_id  (watchlist_id) UNIQUE
#
class Stock < ApplicationRecord
  
    belongs_to :investor,
    foreign_key: :investor_id,
    class_name: "User"

end
