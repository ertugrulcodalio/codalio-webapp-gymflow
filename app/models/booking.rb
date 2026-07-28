# frozen_string_literal: true

class Booking < ApplicationRecord
  belongs_to :organization
  belongs_to :user
  belongs_to :gym_class

  attribute :status, :integer
  enum :status, { confirmed: 0, cancelled: 1 }

  attribute :attendance_status, :integer
  enum :attendance_status, { pending: 0, attended: 1, no_show: 2 }

  validates :status, presence: true

  rhino_owner :organization
  rhino_references [ :organization, :user, :gym_class ]
end
