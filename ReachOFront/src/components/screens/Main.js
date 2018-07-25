import React from 'react'
import { StyleSheet, Platform, Image, Text, View, Button, ImageBackground } from 'react-native'
import firebase from 'react-native-firebase'

import { GoogleSignin } from 'react-native-google-signin';


export default class Main extends React.Component {

  handleLogOut = () => {
    this.signOut()
    firebase.auth().signOut()
    .then(() => this.props.navigation.navigate('Loading'))
      .catch(error => this.setState({ errorMessage: error.message }))
  }

  signOut() {
    try {
      GoogleSignin.revokeAccess();
      GoogleSignin.signOut();
      this.setState({ user: null });
    } catch (error) {
      this.setState({
        error,
      });
    }
  }

  state = { currentUser: null }
  componentDidMount() {
    {
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          this.setState({ user: user._user })
      } else {
        // No user is signed in.
      }
    });
  }
    const { currentUser } = firebase.auth()
    this.setState({ currentUser })
  }

  render() {
      const { currentUser } = this.state

      return (
        <ImageBackground source={require('../utilities/ReachOutTransparent4.png')} style={styles.backgroundImage}>

        <View style={styles.container}>
        <Text style={{color: 'black', fontSize: 28, padding: 20}}>
            Hi, {currentUser && currentUser.displayName}!
          </Text>
          <Button title="Log Out" onPress={this.handleLogOut} color='#4a4a4a'/>
        </View>
          </ImageBackground>
      )
    }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 50
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover', // or 'stretch'
  }

})
