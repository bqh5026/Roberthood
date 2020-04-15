class Api::StocksController < ApplicationController

    def show

          symbol = params[:id]
          url = URI.parse('https://cloud.iexapis.com/stable/tops?token=sk_fdb0342d026443a28057ef26a4c60a23&symbols='+symbol)
          req = Net::HTTP::Get.new(url.to_s)
          res = Net::HTTP.start(url.host, url.port) {|http|
          http.request(req)
            }

        # domain='https://cloud.iexapis.com/stable/tops?token=sk_fdb0342d026443a28057ef26a4c60a23&symbols='+symbol
        # url = URI.parse(domain)
        # req = Net::HTTP::Get.new(url.request_uri)
        # http = Net::HTTP.new(url.host, url.port)
        # http.use_ssl = (url.scheme == "https")
        # response = http.request(req)
        # render :json => res.body 

    end


end
