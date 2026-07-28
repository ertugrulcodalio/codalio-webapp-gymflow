class CreateTrainers < ActiveRecord::Migration[7.2]
  def change
    create_table :trainers do |t|
      t.string :name, null: false
      t.text :bio
      t.integer :status, default: 0, null: false
      t.references :organization, null: false, foreign_key: true

      t.timestamps
    end
  end
end
