require 'net/http'

class Api::NewsController < ApplicationController


def new
    # result = URI.open("https://newsapi.org/v2/top-headlines?country=us&apiKey=eb142e3a8c1b4af9a849e5ee78714783") {|f|
    #   f.each_line {|line| p line}
    # }
    # p result
    # render result.read

    url = URI.parse('http://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=eb142e3a8c1b4af9a849e5ee78714783')
    req = Net::HTTP::Get.new(url.to_s)
    res = Net::HTTP.start(url.host, url.port) {|http|
    http.request(req)
    }
    render :json => res.body 

  end

end

