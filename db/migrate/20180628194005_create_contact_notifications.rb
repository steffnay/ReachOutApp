class CreateContactNotifications < ActiveRecord::Migration[5.1]
  def change
    create_table :contact_notifications do |t|
      t.integer :user_id
      t.integer :contact_id
      t.boolean :replied

      t.timestamps
    end
  end
end
