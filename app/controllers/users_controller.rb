class UsersController < ApplicationController
  def new
  end

  def auth
    user = User.where("username = ? AND password = ?", params[:username], params[:password])

    if user.length == 1
      render :json => user.as_json(only: [:id, :first_name, :last_name, :created_at, :phone, :email, :age]), status: :ok
    else
      render json: {ok: false, errors: user.errors}, status: :bad_request
    end

  end

  def create
    user = User.create(user_params)

    if user.valid?
      ##  when a new user is created, corresponding moodlog is also created
      new_log = user.create_moodlog
      user.log_id = new_log
      user.save
      render json: {id: user.id, log_id: new_log}, status: :ok
    else
      render json: {ok: false, errors: user.errors}, status: :bad_request
    end
  end

  def update
    user = User.find_by(id: params[:id])
    if !user.nil?
      if user.update(user_params)
        render :json => user.as_json(only: [:id, :first_name, :last_name, :created_at, :phone, :email, :age]), status: :ok
      else
        render json: {ok: false, errors: user.errors}, status: :bad_request
      end
    else
      render json: {ok: false, errors: "User does not exist."}, status: :not_found
    end
  end

  def edit
  end

  def destroy
  end

  def index
    users = User.all

    render :json => users.as_json(only: [:id, :first_name, :last_name, :created_at, :phone, :email, :age]), status: :ok
  end

  def show
    user = User.find_by(id: params[:id])
    if user
      show_user_hash = {
        id: user.id,
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        phone: user.phone,
        age: user.age,
        created_at: user.created_at,
      }
      render json: show_user_hash.as_json, status: :ok
    else
      render json: { ok: false, errors: {id: ["User not found"]} }, status: :not_found
    end
  end

  private
    def user_params
      params.permit(:first_name, :last_name, :phone, :email, :age, :username, :password)
    end

end
