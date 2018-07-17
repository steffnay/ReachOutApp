class AddSevereModerateToMoodUpdate < ActiveRecord::Migration[5.1]
  def change
    add_column :mood_updates, :severe, :boolean
    add_column :mood_updates, :moderate, :boolean
  end
end
