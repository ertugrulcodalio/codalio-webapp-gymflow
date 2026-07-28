# frozen_string_literal: true

class Organization < Rhino::Organization
  has_many :users_roles, dependent: :destroy
  has_many :users, through: :users_roles

  rhino_references [ { users_roles: [ :role ] } ]

  def slug
    name.parameterize
  end

  def self.find_by_slug(slug)
    all.find { |o| o.name.parameterize == slug }
  end
end
