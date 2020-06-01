class Api::UsersController < ApplicationController

    before_action :require_logged_in, only: [:show, :index]

    def create 
        @user = User.new(user_params)
        if @user.save
            # flash[:success] = "You have successfully logged in"
            login(@user)
            render "api/users/show"
        else
            render json: @user.errors.full_messages, status: 422
        end
    end

    def new 
        @user = User.new
        render :new
    end
           
    def index 
        @users = User.all
        render :index
    end

    def show
        @user = User.find(params[:id])
        render :show
    end

    private 

    def user_params
        params.require(:user).permit(:first_name, :last_name, :username, :password)
    end

end
