class CreateMoodLogs < ActiveRecord::Migration[5.1]
  def change
    create_table :mood_logs do |t|
      t.integer :user_id
      t.datetime :last_update
      t.integer :recent_severe
      t.integer :recent_moderate

      t.timestamps
    end
  end
end
