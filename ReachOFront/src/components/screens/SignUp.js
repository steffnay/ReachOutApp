import React from 'react'
import { StyleSheet, Text, TextInput, View, Button } from 'react-native'
import firebase from 'react-native-firebase'
import { GoogleSignin, GoogleSigninButton } from 'react-native-google-signin';
import { LoginManager, AccessToken } from 'react-native-fbsdk';

import api from '../utilities/api'


export default class SignUp extends React.Component {

  state = { email: '',
    password: '',
    errorMessage: null }

    componentDidMount() {
      GoogleSignin.hasPlayServices({ autoResolve: true })
      .then(() => {
        // play services are available. can now configure library
      })
      .catch(err => {
        console.log('Play services error', err.code, err.message);
      });


      GoogleSignin.configure({
        scopes: ['https://www.googleapis.com/auth/drive.readonly'], // what API you want to access on behalf of the user, default is email and profile
        // webClientId: '37407735627-q2qmr3c6i8840rrd28gvl5de2hev6dsv.apps.googleusercontent.com',
        webClientId: '37407735627-sktu6aamkn16rc618sd1m7a8h3052lpm.apps.googleusercontent.com',

        // offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
        // hostedDomain: '', // specifies a hosted domain restriction
        // forceConsentPrompt: true, // [Android] if you want to show the authorization prompt at each login
        // accountName: '', // [Android] specifies an account name on the device that should be used
      }).then(() => {
        // you can now call currentUserAsync()
      });
    }


    googleSignIn = () => {
    GoogleSignin.signIn()
    .then((data) => {
      const credential = firebase.auth.GoogleAuthProvider.credential(
        data.idToken,
        data.accessToken
      );

      // login with credential
      const currentUser = firebase
        .auth()
        .signInAndRetrieveDataWithCredential(credential);

        console.log("made it to end of firebaselogin 1")
        let now = firebase.auth().currentUser
        console.log(now)
        console.log("made it to end of firebaselogin 2")



      console.log(data);
      this.setState({user: data});
    })
    .then(() => this.props.navigation.navigate('Main'))
    .catch((err) => {
      console.log('WRONG SIGNIN', err);
    })
    .done()
  }

onLoginFacebook = () => {
  LoginManager
    .logInWithReadPermissions(['public_profile', 'email'])
    .then((result) => {
      if (result.isCancelled) {
        return Promise.reject(new Error('The user cancelled the request'));
      }

      console.log(`Success. ${result.grantedPermissions.toString()}`);
      return AccessToken.getCurrentAccessToken();
    })
    .then(data => {
      const credential = firebase.auth.FacebookAuthProvider.credential(data.accessToken);
      return firebase.auth().signInWithCredential(credential);
    })
    .then((currentUser) => {
      console.log('hip hop hooray')
      const data = currentUser._user
      console.log(currentUser._user);
      this.setState({user: currentUser._user});

      const collection = {
        first_name: data.displayName,
        email: data.email,
        provider: "facebook",
        uid: data.uid
      }

      api.createUser(collection)
    })
    .catch((error) => {
      alert(error)
    });


}


render() {

    return (
      <View style={styles.container}>

        <GoogleSigninButton
          style={{ width: 250, height: 48 }}
          size={GoogleSigninButton.Size.Wide}
          color={GoogleSigninButton.Color.Dark}
          onPress={this.googleSignIn}/>

        <Button title="LoginFB" containerStyle={{
          padding: 10,
          width: 150,
          margin: 20,
          borderRadius: 4,
          backgroundColor: 'rgb(73,104,173)'
        }}
        style = {{fontSize: 18, color: 'white'}}
        onPress={this.onLoginFacebook}/>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  textInput: {
    height: 40,
    width: '90%',
    borderColor: 'gray',
    borderWidth: 1,
    marginTop: 8
  }
})
