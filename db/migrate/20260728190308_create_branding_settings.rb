class CreateBrandingSettings < ActiveRecord::Migration[7.2]
  def change
    create_table :branding_settings do |t|
      t.string :logo_url
      t.string :primary_color
      t.references :organization, null: false, foreign_key: true

      t.timestamps
    end
  end
end
