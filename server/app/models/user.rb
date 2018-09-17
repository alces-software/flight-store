require_dependency 'json_web_token'

class User < ApplicationRecord
  validates :username, uniqueness: true

  def self.from_jwt_token(token)
    claims = ::JsonWebToken.decode(token)  # handles signature verification too

    user = where(flight_id: claims.fetch('flight_id')).first_or_initialize

    user.tap do |u|
      # The following is _not_ provided as a block to `first_or_initialize`
      # since we want to update the user's details locally in the event that
      # they have changed in the SSO database. `first_or_initialize` only
      # executes the block when the record cannot be found.
      u.email = claims.fetch('email')
      u.username = claims.fetch('username')
      u.save!
    end
  rescue
    Alces.app.logger.warn("Error whilst retrieving user from JWT") do
      $!
    end
    raise
  end
end
