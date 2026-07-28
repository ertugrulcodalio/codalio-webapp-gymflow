class CreateGymClasses < ActiveRecord::Migration[7.2]
  def change
    create_table :gym_classes do |t|
      t.string :name, null: false
      t.text :description
      t.datetime :start_time
      t.datetime :end_time
      t.integer :capacity
      t.integer :status, default: 0, null: false
      t.references :organization, null: false, foreign_key: true
      t.references :trainer, null: false, foreign_key: true

      t.timestamps
    end
  end
end
