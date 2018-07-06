class SetDefaultValuesMoodLog < ActiveRecord::Migration[5.1]
  def change
    change_column :mood_logs , :recent_severe , :integer , default: 0
    change_column :mood_logs , :recent_moderate , :integer , default: 0
  end
end
