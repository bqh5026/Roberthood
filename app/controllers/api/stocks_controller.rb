# load "IEX"

# require 'iex-ruby-client'

class Api::StocksController < ApplicationController

    def quote
    
          # symbol = params[:id]
          # url = URI.parse('https://cloud.iexapis.com/stable/tops?token=sk_fdb0342d026443a28057ef26a4c60a23&symbols='+symbol)
          # puts url.to_s
          # req = Net::HTTP::Get.new(url.to_s)
          # # req.use_ssl = true
          # # req.verify_mode = OpenSSL::SSL::VERIFY_NONE
          # res = Net::HTTP.start(url.host, url.port) {|http|
          # http.request(req)
          #   }
          # render :json => res.body 
       
          symbol = params[:symbol]
          IEX::Api.configure do |config|
            config.publishable_token = 'pk_a97bf10f146749bf9d64c36ba6ee72c6' # defaults to ENV['IEX_API_PUBLISHABLE_TOKEN']       
            config.secret_token = 'sk_fdb0342d026443a28057ef26a4c60a23' # defaults to ENV['IEX_API_PUBLISHABLE_TOKEN']       
          end
          # client = IEX::Api::Client.new()
          client = IEX::Api::Client.new(
          publishable_token: 'pk_a97bf10f146749bf9d64c36ba6ee72c6',
          secret_token: 'sk_fdb0342d026443a28057ef26a4c60a23',
          endpoint: 'https://cloud.iexapis.com/v1'
            )
          # byebug
          result = client.quote(symbol)
          render :json => result

    end

    def chart 
          symbol = params[:symbol]
          client = IEX::Api::Client.new(
          publishable_token: 'pk_a97bf10f146749bf9d64c36ba6ee72c6',
          secret_token: 'sk_fdb0342d026443a28057ef26a4c60a23',
          endpoint: 'https://cloud.iexapis.com/v1'
            )
          # byebug
          result = client.chart(symbol, "5d")
          render :json => result

    end


end
