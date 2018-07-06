require 'geometry'

class MoodUpdate < ApplicationRecord

  include Geometry
  belongs_to :mood_log

  validates :primary_mood, numericality: { only_integer: true }
  validates :intensity, numericality: { only_integer: true }
  validates :mood_log_id, numericality: { only_integer: true, greater_than_or_equal_to: 0 }

  def is_severe?
    x = self.primary_mood
    y = self.intensity

    is_within = false
    mood_coordinates = Point(x,y)

    moderate = Polygon.new [
      Point(0, 8),
      Point(0, 10),
      Point(-10, 10),
      Point(-10, -10),
      Point(0, -10),
      Point(0, -8),
      Point(-7, -8),
      Point(-8,-7),
      Point(-8, 7),
      Point(-7, 8)
      ]

    if moderate.contains?(mood_coordinates)
      is_within = true
    end

    return is_within
  end


  def is_moderate?
    x = self.primary_mood
    y = self.intensity

    is_within = false
    mood_coordinates = Point(x,y)

    moderate = Polygon.new [
      Point(0, 7),
      Point(0, 7.99),
      Point(-7, 7.99),
      Point(-7.99, 7),
      Point(-7, 0),
      Point(0, -7),
      Point(0, -7.99),
      Point(-7, -7.99),
      Point(-7.99, -7)
      ]

    if moderate.contains?(mood_coordinates)
      is_within = true
    end

    return is_within
  end

end
