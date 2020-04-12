
# json.content format_content(@message.content)

# json.extract! user, :id, :username, :first_name,
#               :last_name

json.partial! "api/users/user", user: @user