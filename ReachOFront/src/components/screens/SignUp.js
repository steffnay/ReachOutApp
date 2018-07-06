import React from 'react'
import { StyleSheet, Text, TextInput, View, Button } from 'react-native'
import firebase from 'react-native-firebase'
import { GoogleSignin, GoogleSigninButton } from 'react-native-google-signin';
import GoogleLogin from './GoogleLoginButton';


export default class SignUp extends React.Component {

  state = { email: '',
    password: '',
    errorMessage: null }

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

  googleCreate = () => {
    GoogleSignInOptions gso = new GoogleSignInOptions.Builder(GoogleSignInOptions.DEFAULT_SIGN_IN)
        .requestEmail()
        .build();

    mGoogleSignInClient = GoogleSignIn.getClient(this, gso);


  }

  googleSignIn = async () => {
    try {
      const user = await GoogleSignin.signIn();
      this.setState({ user });
    } catch (error) {
      if (error.code === 'CANCELED') {
        // user cancelled the login flow
      } else {
        // some other error happened
      }
    }
  };

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

        // <GoogleSigninButton
        //   style={{ width: 250, height: 48 }}
        //   size={GoogleSigninButton.Size.Wide}
        //   color={GoogleSigninButton.Color.Dark}
        //   onPress={this.googleSignIn()}
        //   onCreate={this.googleCreate()}/>



        <GoogleLogin
           onLogin={
             (result) => {
               console.log(‘Google onLogin’)
               if (result.message) {
                 alert(‘error: ‘ + result.message)
               } else {
                 alert(“Login was successful “ + result.name + ‘ — ‘ + result.email)
               }
            }
           }
           onLogout={() => alert(“logged out”)}
             onError={
               (result) => {
                 if (result.error) {
                   alert(‘error: ‘ + result.error)
                 } else {
                   alert(“error”)
                 }
              }
           }
        />
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
