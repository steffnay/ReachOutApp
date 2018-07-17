require 'csv'

USER_FILE = Rails.root.join('db', 'seed_data', 'users.csv')
puts "Loading raw user data from #{USER_FILE}"

user_failures = []
CSV.foreach(USER_FILE, :headers => true) do |row|
  user = User.new
  user.id = row['id']
  user.first_name = row['first_name']
  user.last_name = row['last_name']
  user.email = row['email']
  user.phone = row['phone']
  user.age = row['age']
  user.uid = row['uid']
  user.provider = row['provider']
  user.username = row['username']
  user.password = row['password']
  successful = user.save
  if !successful
    user_failures << user
    puts "Failed to save user: #{user.inspect}"
  else
    puts "Created user: #{user.inspect}"
  end
end

puts "Added #{User.count} user records"
puts "#{user_failures.length} users failed to save"


CONTACT_FILE = Rails.root.join('db', 'seed_data', 'contacts.csv')
puts "Loading raw contact data from #{CONTACT_FILE}"

contact_failures = []
CSV.foreach(CONTACT_FILE, :headers => true) do |row|
  contact = Contact.new
  contact.id = row['id']
  contact.first_name = row['first_name']
  contact.last_name = row['last_name']
  contact.email = row['email']
  contact.phone = row['phone']
  contact.confirmed = row['confirmed']
  contact.user_id = row['user_id']
  successful = contact.save
  if !successful
    contact_failures << contact
    puts "Failed to save contact: #{contact.inspect}"
  else
    puts "Created contact: #{contact.inspect}"
  end
end

puts "Added #{Contact.count} contact records"
puts "#{contact_failures.length} contacts failed to save"

MOODLOG_FILE = Rails.root.join('db', 'seed_data', 'moodlogs.csv')
puts "Loading raw moodlog data from #{MOODLOG_FILE}"

moodlog_failures = []
CSV.foreach(MOODLOG_FILE, :headers => true) do |row|
  moodlog = MoodLog.new
  moodlog.id = row['id']
  moodlog.user_id = row['user_id']
  successful = moodlog.save
  if !successful
    moodlog_failures << moodlog
    puts "Failed to save moodlog: #{moodlog.inspect}"
  else
    puts "Created moodlog: #{moodlog.inspect}"
  end
end

puts "Added #{MoodLog.count} moodlog records"
puts "#{moodlog_failures.length} moodlogs failed to save"


MOODUPDATES_FILE = Rails.root.join('db', 'seed_data', 'mood_updates.csv')
puts "Loading raw mood_update data from #{MOODUPDATES_FILE}"

mood_update_failures = []
CSV.foreach(MOODUPDATES_FILE, :headers => true) do |row|
  mood_update = MoodUpdate.new
  mood_update.id = row['id']
  mood_update.mood_log_id = row['mood_log_id']
  mood_update.primary_mood = row['primary_mood']
  mood_update.intensity = row['intensity']
  successful = mood_update.save
  if !successful
    mood_update_failures << mood_update
    puts "Failed to save mood_update: #{mood_update.inspect}"
  else
    mood_update = MoodUpdate.find(row['id'])
    mood_update.created_at = row['created_at']

    if mood_update.is_severe?
      mood_update.severe = true
      mood_update.moderate = false
    elsif mood_update.is_moderate?
      mood_update.moderate = true
      mood_update.severe = false
    else
      mood_update.moderate = false
      mood_update.severe = false
    end
    mood_update.save
    puts "Created mood_update: #{mood_update.inspect}"
  end
end

puts "Added #{MoodLog.count} mood_update records"
puts "#{moodlog_failures.length} mood_updates failed to save"



# Since we set the primary key (the ID) manually on each of the
# tables, we've got to tell postgres to reload the latest ID
# values. Otherwise when we create a new record it will try
# to start at ID 1, which will be a conflict.
puts "Manually resetting PK sequence on each table"
ActiveRecord::Base.connection.tables.each do |t|
  ActiveRecord::Base.connection.reset_pk_sequence!(t)
end

puts "~~** DONE **~~"
