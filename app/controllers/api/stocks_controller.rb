class Api::StocksController < ApplicationController

    def show
          # debugger
          symbol = params[:id]
          url = URI.parse('https://cloud.iexapis.com/stable/tops?token=sk_fdb0342d026443a28057ef26a4c60a23&symbols='+symbol)
          puts url.to_s
          req = Net::HTTP::Get.new(url.to_s)
          # req.use_ssl = true
          # req.verify_mode = OpenSSL::SSL::VERIFY_NONE
          res = Net::HTTP.start(url.host, url.port) {|http|
          http.request(req)
            }
          render :json => res.body 

        # domain='https://cloud.iexapis.com/stable/tops?token=sk_fdb0342d026443a28057ef26a4c60a23&symbols='+symbol
        # url = URI.parse(domain)
        # req = Net::HTTP::Get.new(url.request_uri)
        # http = Net::HTTP.new(url.host, url.port)
        # http.use_ssl = (url.scheme == "https")
        # response = http.request(req)
        # render :json => res.body 

    end


end
