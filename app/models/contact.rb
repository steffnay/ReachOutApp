class Contact < ApplicationRecord
  belongs_to :user
  has_many :contact_notifications

  validates :first_name, presence: :true, format: { with: /\A[a-zA-Z]+(?: [a-zA-Z]+)?\z/,
  message: "Only allows letters" }

  validates :last_name, presence: :true, format: { with: /\A[a-zA-Z]+(?: [a-zA-Z]+)?\z/,
  message: "Only allows letters" }, :allow_blank => false

  validates :phone, presence: :true, format: { with: /\d{3}-\d{3}-\d{4}/, message: "bad phone number format" }

  validates :email, format: { with: /\A([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})\z/i, on: :create }, :allow_blank => true

  validates :user_id, presence: :true, numericality: { only_integer: true, greater_than_or_equal_to: 1 }

  def make_notification(status)
    user = User.find(self.user_id)
    user_first_name = user.first_name
    user_last_name = user.last_name

    notice = ContactNotification.create(user_id: self.user_id, contact_id: self.id)

    if notice.valid?
      if status == :severe
        message = "Hi, #{self.first_name}. Your friend #{user_first_name} #{user_last_name} has been having a really hard time with severely unpleasant feelings lately. It seems like they're really struggling and need you to reach out."
      elsif status == :moderate
        message = "Hi, #{self.first_name}. Your friend #{user_first_name} #{user_last_name} has been having a really hard time with moderately unpleasant feelings lately. It's a good idea to reach out to them."
      end

      TwilioTextMessenger.new(message).call

    end

  end
end
