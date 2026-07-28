class AddMembershipPlanToUsers < ActiveRecord::Migration[8.0]
  def change
    add_reference :users, :membership_plan, null: true, foreign_key: true
  end
end
