# <style>

# form {
#     margin: 0 auto;
#     width: 400px; 
# }
# .signup-header {
#     font-size: 20px;
#     font-family: 'Hiragino Sans GB'; 
#     font-weight: 100; 
#     color: #040d14;
#     Margin: 0px 0px 12px;
# }

# .signup-subheader {
#     font-size: 10px;
#     font-family: 'Hiragino Sans GB'; 
#     font-weight: 100; 
#     color: #040d14;
#     Margin: 0px 0px 12px;
# }

# .signup-button {
#     background: #21ce99; 
#     font: 'Hirano Sans GB'; 
#     font-size: 8px; 
#     color: #ffffff; 
#     padding: 5px 16px 5px; 
#     border-radius: 5px; 
# }

# </style>



# <form action="<%= users_url %>" method="POST">
# <div><%= image_tag('logos/roberthood_green_feather.jpg', width: '20px') %></div>
# <div>
#     <h1 class='signup-header'>Make Your Money Move</h1>
#     <h3 class='signup-subheader'>Robinhood lets you invest in companies you love, commission-free.</h3>
# </div>
#     <input 
#         type="hidden"
#         name="authenticity_token"
#         value="<%= form_authenticity_token %>"
#     >
#     <input name="user[first_name]" value="First Name">
#     <input name="user[last_name]" value="Last Name">
#     <input name="user[username]" value="Username">
#     <input name="user[password]" value="Password">
#     <button class='signup-button' type="submit">Continue</button>
# </form>