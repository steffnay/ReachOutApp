let api = {
  getUser(userID){
    let url = `http://localhost:3000/users/${userID}`;
    return fetch(url).then((res) => res.json());
  }
}

module.exports = api;
