class ContactNotification < ApplicationRecord
  belongs_to :contact
  belongs_to :user

  validates :user_id, numericality: { only_integer: true, greater_than_or_equal_to: 1 }
  validates :contact_id, numericality: { only_integer: true, greater_than_or_equal_to: 1 }

end
