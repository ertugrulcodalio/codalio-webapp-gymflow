class CreateBookings < ActiveRecord::Migration[7.2]
  def change
    create_table :bookings do |t|
      t.integer :status, default: 0, null: false
      t.integer :attendance_status, default: 0, null: false
      t.references :organization, null: false, foreign_key: true
      t.references :user, null: false, foreign_key: true
      t.references :gym_class, null: false, foreign_key: true

      t.timestamps
    end
  end
end
