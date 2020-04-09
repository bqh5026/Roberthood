# <h1>Say hello to <%= @user.username %> </h1>

# <div>
#     <p>These are <%= @user.username %> 's stocks: </p>
#     <ul>
#         <% @user.stocks.each do |stock| %>
#             <p><%= stock.tiker %></p>
#             <p><%= stock.company_name %></p>
#             <p><%= stock.company_info %></p>
#         <form action= <%= stock_url(stock) %> method="POST">
#             <input 
#             type="hidden"
#             name="authenticity_token"
#             value="<%= form_authenticity_token %>">
#             <input type="hidden" name="_method" value="DELETE" />
#             <button type="submit">Sell Stock</button>
#         </form>
#         <% end %>
#     </ul>
# </div>