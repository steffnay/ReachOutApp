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
          console.log(`current user: ${user}`)

        // api.getUser(1).then((user) => {
        //   console.log('hello')
        //   let phone = user["phone"]
        //   console.log(`API info: ${phone}`)
        //   this.setState({ backendData: user})
        // }).then (() => {
        //   // const firebaseUser = firebase.auth().currentUser
        //   this.setState({ userData: user._user })
        //   console.log(this.state)
        //   console.log("checking!!!")
        //   console.log(this.state.userData.displayName)
        // })
      } else {
        // No user is signed in.
      }
    });
  }
    const { currentUser } = firebase.auth()
    this.setState({ currentUser })
    console.log(currentUser)
    console.log("this is user")
  }

  render() {
      const { currentUser } = this.state
      console.log(`${currentUser} hello`)

      return (
        <ImageBackground source={require('../utilities/ReachOut.png')} style={styles.backgroundImage}>

        <View style={styles.container}>
        <Text>
            Hello {currentUser && currentUser.email}!
          </Text>
          <Button title="Log Out" onPress={this.handleLogOut} />
        </View>
          </ImageBackground>
      )
    }
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover', // or 'stretch'
  }

})
