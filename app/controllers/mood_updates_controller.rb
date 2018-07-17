require 'pry'
class MoodUpdatesController < ApplicationController
  def new
  end

  def create
    uid = params[:uid]

    if User.exists?(uid: uid, provider: params[:provider])
      user = User.find_by(uid: uid, provider: params[:provider])

      if MoodLog.exists?(user_id: user.id)
        mood_log = MoodLog.find_by(user_id: user.id)
        mood_update = MoodUpdate.new(primary_mood: params[:primary_mood], intensity: params[:intensity], mood_log_id: mood_log.id)

        if mood_update.valid?

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

          if mood_update.save

            log = MoodLog.find(mood_log.id)
            log.update_log
          end

          render json: {id: mood_update.id, severe: mood_update.severe, moderate: mood_update.moderate}, status: :ok
        else
          render json: {ok: false, errors: mood_update.errors}, status: :bad_request
        end
      end
    else
        render json: {ok: false, errors: "Mood Log does not exist"}, status: :bad_request
    end
  end

  def update
  end

  def edit
  end

  def destroy
  end

  def index
  end

  def show
  end

  private
    def mood_update_params
      params.permit(:primary_mood, :intensity, :provider, :uid)
    end
end
