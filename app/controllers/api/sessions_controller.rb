

class Api::SessionsController < ApplicationController

   before_action :require_logged_in, only: [:destroy]

  def new
    render :new
  end

  def create
    @user = User.find_by_credentials(
      params[:user][:username],
      params[:user][:password]
    )

    if @user
      login(@user)
      render 'api/users/show'
    else
      render json: ['Invalid username/password combination'], status: 401
    end
  end

  def destroy
    @user = current_user
    if @user 
    logout
    render 'api/users/show'
    # render 'api/session/new'
    # redirect_to 'api/session/new'
    else 
    render json: ['Nobody signed in'], status: 404
    end
  end
end