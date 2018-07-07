import React from 'react'
import { StyleSheet, Text, TextInput, View, Button } from 'react-native'
import firebase from 'react-native-firebase'
import { GoogleSignin, GoogleSigninButton } from 'react-native-google-signin';


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

  handleSignUp = () => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then(() => this.props.navigation.navigate('Main'))
      .catch(error => this.setState({ errorMessage: error.message }))
  }

  handleAnonymous = () => {
    firebase
      .auth()
      .signInAnonymously()
      .then(() => this.props.navigation.navigate('Main'))
      .catch(error => this.setState({ errorMessage: error.message }))
  }

  googleSignIn = () => {
    GoogleSignin.signIn()
    .then((user) => {
      console.log(user);
      this.setState({user: user});
    })
    .then(() => this.props.navigation.navigate('Main'))
    .catch((err) => {
      console.log('WRONG SIGNIN', err);
    })
    .done()
  }



render() {
    return (
      <View style={styles.container}>
        <Text>Sign Up</Text>
        {this.state.errorMessage &&
          <Text style={{ color: 'red' }}>
            {this.state.errorMessage}
          </Text>}
        <TextInput
          placeholder="Email"
          autoCapitalize="none"
          style={styles.textInput}
          onChangeText={email => this.setState({ email })}
          value={this.state.email}
        />
        <TextInput
          secureTextEntry
          placeholder="Password"
          autoCapitalize="none"
          style={styles.textInput}
          onChangeText={password => this.setState({ password })}
          value={this.state.password}
        />
        <Button title="Sign Up" onPress={this.handleSignUp} />
        <Button title="Anonymous User" onPress={this.handleAnonymous} />
        <Button
          title="Already have an account? Login"
          onPress={() => this.props.navigation.navigate('Login')}
        />

        <GoogleSigninButton
          style={{ width: 250, height: 48 }}
          size={GoogleSigninButton.Size.Wide}
          color={GoogleSigninButton.Color.Dark}
          onPress={this.googleSignIn}/>

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
