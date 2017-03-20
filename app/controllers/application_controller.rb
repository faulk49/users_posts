class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception

  before_action :authenticate_user!
  before_action :configure_permitted_parameters, if: :devise_controller?

  def pagination_attributes(resource, extra_options = {})
    resource_name = resource.klass.to_s.pluralize.underscore.to_sym
    {
      pagination: {
        resource_name => {
          current_page: resource.current_page,
          next_page: resource.next_page,
          prev_page: resource.prev_page,
          total_pages: resource.total_pages
        }
      }
    }.merge(extra_options)
  end

  def current_user
    super || GuestUser.new
  end

  protected

  def configure_permitted_parameters
    devise_parameter_sanitizer.permit(:sign_up, keys: [:first_name, :last_name])
  end
end
