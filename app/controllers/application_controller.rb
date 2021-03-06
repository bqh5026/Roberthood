
class ApplicationController < ActionController::Base

  protect_from_forgery with: :exception
    skip_before_action :verify_authenticity_token

  before_action :set_title


  private

  helper_method :current_user, :logged_in?

  def current_user
    return nil unless session[:session_token]
    @current_user ||= User.find_by_session_token(session[:session_token])
  end

  def logged_in?
    !current_user.nil?
  end

  def login(user)
    session[:session_token] = user.session_token
  end

  def logout
    current_user.reset_session_token!
    session[:session_token] = nil
  end

  def require_logged_out
    redirect_to api_user_url(current_user) if logged_in?
  end

  def require_logged_in
    redirect_to new_api_session_url unless logged_in?
  end

  def set_title
    @page_title = "Roberthood"
  end
end

