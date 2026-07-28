# frozen_string_literal: true

class BrandingSetting < ApplicationRecord
  belongs_to :organization

  validates :logo_url, presence: true

  rhino_owner :organization
  rhino_references [ :organization ]
end
