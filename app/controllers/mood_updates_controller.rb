require 'pry'
class MoodUpdatesController < ApplicationController
  def new
  end

  def create
    mood_update = MoodUpdate.new(mood_update_params)

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

        log = MoodLog.find(params[:mood_log_id])
        log.update_log
      end

      render json: {id: mood_update.id, severe: mood_update.severe, moderate: mood_update.moderate}, status: :ok
    else
      render json: {ok: false, errors: mood_update.errors}, status: :bad_request
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
      params.permit(:primary_mood, :intensity, :mood_log_id)
    end
end
