
class ContactsController < ApplicationController
  def create
    contact = Contact.new(contact_params)
    contact.confirmed = false
    if contact.valid?
      contact.save
      render json: {id: contact.id}, status: :ok
    else
      render json: {ok: false, errors: contact.errors}, status: :bad_request
    end
  end

  def update
    contact = Contact.find_by(id: params[:id])
    ###### if phone is updated, resend confirmation through Twilio


    if !contact.nil?
      if contact.update(contact_params)
        render :json => contact.as_json(only: [:id, :first_name, :last_name, :phone, :email, :confirmed, :user_id]), status: :ok
      else
        render json: {ok: false, errors: contact.errors}, status: :bad_request
      end
    else
      render json: {ok: false, errors: "Contact does not exist"}, status: :not_found
    end
  end

  def edit
  end

  def destroy
    if Contact.exists?(id: params[:id])
      contact = Contact.find(params[:id])
      if contact.destroy
        render json: {ok: true}, status: :ok
      else
        render json: {ok: false, errors: contact.errors}, status: :bad_request
      end
    else
      render json: {ok: false, errors: "Contact not found"}, status: :bad_request
    end
  end

  def index
    contacts = Contact.all

    render :json => contacts.as_json(only: [:id, :first_name, :last_name, :phone, :email, :confirmed, :user_id]), status: :ok

  end

  def show
    contact = Contact.find_by(id: params[:id])
    if contact
      show_contact_hash = {
        id: contact.id,
        first_name: contact.first_name,
        last_name: contact.last_name,
        email: contact.email,
        phone: contact.phone,
        confirmed: contact.confirmed,
        user_id: contact.user_id,
      }
      render json: show_contact_hash.as_json, status: :ok
    else
      render json: { ok: false, errors: {id: ["Contact not found"]} }, status: :not_found
    end
  end


  def user_list
    contactList = Contact.where(user_id: params[:id])

    if contactList
      contacts_array = []
      contactList.each do |contact, index|
        contact = {
          id: contact.id,
          first_name: contact.first_name,
          last_name: contact.last_name,
          email: contact.email,
          phone: contact.phone,
          confirmed: contact.confirmed,
          user_id: contact.user_id,
        }
        contacts_array.push(contact)
      end

      show_contact_hash = {contacts: contacts_array}
      render json: show_contact_hash.as_json, status: :ok
    else
      render json: { ok: false, errors: {id: ["Contact not found"]} }, status: :not_found
    end
  end

  private
    def contact_params
      params.permit(:first_name, :last_name, :phone, :email, :user_id)
    end

end
