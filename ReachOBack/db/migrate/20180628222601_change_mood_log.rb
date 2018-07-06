class ChangeMoodLog < ActiveRecord::Migration[5.1]
  def change
    rename_column :mood_updates, :log_id, :mood_log_id
  end
end
