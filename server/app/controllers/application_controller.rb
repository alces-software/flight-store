require_dependency 'json_web_token'

class ApplicationController < ActionController::API
  include Pundit
  include ::ActionController::Cookies

  # Make sure that we create a new User record if required.
  before_action :current_user

  def current_user
    return @current_user if @current_user.present?
    token = auth_token
    return @current_user = nil unless token.present?
    if JsonWebToken.jwt_token?(token)
      @current_user = User.from_jwt_token(token) rescue nil
    else
      @current_user = nil
    end
  end

  private

  def auth_token
    auth_cookie = cookies['flight_sso']
    auth_header = request.headers['Authorization']
    return nil unless auth_cookie.present? || auth_header.present?
    token = auth_header.present? ? auth_header.split(' ').last : auth_cookie
    return token
  end
end
