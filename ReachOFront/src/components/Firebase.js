
import * as firebase from "firebase";

const config = {
  apiKey: "AIzaSyArdXiFAmElnCu2HvA5UunBPkUXiCUo9d4",
  authDomain: "ro-front.firebaseapp.com",
  databaseURL: "https://ro-front.firebaseio.com",
  projectId: "ro-front",
  storageBucket: "ro-front.appspot.com",
  messagingSenderId: "687681875420"
};

export default class FireBase {
  static auth;

  static init() {
    firebase.initializeApp(config);
    Firebase.auth = firebase.auth();

  }
}
