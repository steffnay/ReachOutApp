class CreateMoodUpdates < ActiveRecord::Migration[5.1]
  def change
    create_table :mood_updates do |t|
      t.integer :primary_mood
      t.integer :intensity
      t.integer :log_id

      t.timestamps
    end
  end
end
