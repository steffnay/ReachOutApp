

class User < ApplicationRecord
  has_one :mood_log
  has_many :contacts

  validates :first_name, presence: :true, format: { with: /\A[a-zA-Z]+(?: [a-zA-Z]+)?\z/,
  message: "Only allows letters" }

  validates :last_name, presence: :true, format: { with: /\A[a-zA-Z]+(?: [a-zA-Z]+)?\z/,
  message: "Only allows letters" }

  validates :phone, format: { with: /\d{3}-\d{3}-\d{4}/, message: "bad phone number format" }, :allow_blank => true

  validates :email, format: { with: /\A([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})\z/i, on: :create }

  validates :age, numericality: { only_integer: true, greater_than_or_equal_to: 13 }, :allow_blank => true


  def create_moodlog
    if MoodLog.where(:user_id => self.id).blank?
      new_log = MoodLog.create(user_id: self.id)
      return new_log.id
    end
  end

  def show_contacts
    user_contacts = Contact.where(user_id: self.id)
    return user_contacts
  end

  def make_alert(status)
    contact_list = Contact.where("user_id = ? AND confirmed = ?", self.id, true)

    if contact_list.length > 0
      index = rand(contact_list.length)
      choice = contact_list[index]
      choice.make_notification(status)
    end

  end

end
