const api = {
  getUser(userID){
    let url = `http://reach-out-project-backend.herokuapp.com/users/${userID}`;
    return fetch(url).then((res) => res.json());
  },

  getContacts(userID){
    let url = `http://reach-out-project-backend.herokuapp.com/contacts/userlist/${userID}`;
    return fetch(url).then((res) => res.json());
  },

  getContactInfo(contactID){
    let url = `http://reach-out-project-backend.herokuapp.com/contacts/${contactID}`;
    return fetch(url).then((res) => res.json());
  },

  getWeekLogData(uid){
    let url = `http://reach-out-project-backend.herokuapp.com/mood_logs?uid=${uid}&week=true`;
    return fetch(url).then((res) => res.json());
  },

  getMonthLogData(uid){
    let url = `http://reach-out-project-backend.herokuapp.com/mood_logs?uid=${uid}&month=true`;
    return fetch(url).then((res) => res.json());
  },

  createContact(contactInfo){
    let url = `http://reach-out-project-backend.herokuapp.com/contacts`;
    return fetch(url, {
      method: 'POST',
      body: JSON.stringify(contactInfo),
      headers: new Headers({
        'Content-Type': 'application/json; charset=utf-8'
      })
    }).then((res) => res.json());
  },

  updateContact(contactInfo){
    let url = `http://reach-out-project-backend.herokuapp.com/contacts/${contactInfo.id}`;
    return fetch(url, {
      method: 'PUT',
      body: JSON.stringify(contactInfo),
      headers: new Headers({
        'Content-Type': 'application/json; charset=utf-8'
      })
    }).then((res) => res.json());
  },

  deleteContact(id){
    let url = `http://reach-out-project-backend.herokuapp.com/contacts/${id}`;
    return fetch(url, {
      method: 'DELETE',
      body: JSON.stringify(),
      headers: new Headers({
        'Content-Type': 'application/json; charset=utf-8'
      })
    }).then((res) => res.json());
  },

  updateMood(moodInfo){
    let url = `http://reach-out-project-backend.herokuapp.com/mood_updates`;
    return fetch(url, {
      method: 'POST',
      body: JSON.stringify(moodInfo),
      headers: new Headers({
        'Content-Type': 'application/json; charset=utf-8'
      })
    }).then((res) => res.json() (
      console.log(res)
    ));
  },

  createUser(userInfo){
    let url = `http://reach-out-project-backend.herokuapp.com/users`;
    return fetch(url, {
      method: 'POST',
      body: JSON.stringify(userInfo),
      headers: new Headers({
        'Content-Type': 'application/json; charset=utf-8'
      })
    }).then((res) => res.json() (
      console.log(res)
    ));
  }

}


module.exports = api;
