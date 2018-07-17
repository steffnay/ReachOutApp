class MoodLogsController < ApplicationController
  def new
  end

  def create
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
    mood_log = MoodLog.find_by(id: params[:id])
    if mood_log
      updates = MoodUpdate.where(mood_log_id: mood_log.id)
      render json: updates.as_json, status: :ok
    else
      render json: { ok: false, errors: {id: ["Mood Log not found"]} }, status: :not_found
    end
  end
end
