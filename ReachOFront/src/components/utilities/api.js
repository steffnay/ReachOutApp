const api = {
  getUser(userID){
    let url = `http://localhost:3000/users/${userID}`;
    return fetch(url).then((res) => res.json());
  },

  getContacts(userID){
    let url = `http://localhost:3000/contacts/userlist/${userID}`;
    return fetch(url).then((res) => res.json());
  },

  getContactInfo(contactID){
    let url = `http://localhost:3000/contacts/${contactID}`;
    return fetch(url).then((res) => res.json());
  },

  updateContact(contactInfo){
    let url = `http://localhost:3000/contacts/${contactInfo.id}`;
    return fetch(url, {
      method: 'PUT',
      body: JSON.stringify(contactInfo),
      headers: new Headers({
        'Content-Type': 'application/json; charset=utf-8'
      })
    }).then((res) => res.json());
  }

}


module.exports = api;
