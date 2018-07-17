class MoodLog < ApplicationRecord
  belongs_to :user
  has_many :mood_updates

  validates :user_id, numericality: { only_integer: true, greater_than_or_equal_to: 1}

  validates :recent_severe, numericality: { only_integer: true, greater_than_or_equal_to: 0 }, :allow_blank => true

  validates :recent_moderate, numericality: { only_integer: true, greater_than_or_equal_to: 0 }, :allow_blank => true

  def update_log
    recents = MoodUpdate.where("created_at > ? AND mood_log_id = ?", Time.now-3.days, self.id)
    severe_count = 0
    moderate_count = 0

    recents.each do |update|
      if update.severe == true
        severe_count += 1
      elsif update.moderate == true
        moderate_count += 1
      end
    end

    self.recent_severe = severe_count
    self.recent_moderate = moderate_count
    self.save

    if severe_count > 2
      self.alert_contact(:severe)
    elsif moderate_count > 4
      self.alert_contact(:moderate)
    end
  end

  def alert_contact(status)
    user = User.find_by(id: self.user_id)

    if status == :severe
      user.make_alert(:severe)
    elsif status == :moderate
      user.make_alert(:moderate)
    end
  end
end
