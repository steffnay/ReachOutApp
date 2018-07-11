import React from 'react'
import { StyleSheet, Platform, Image, Text, View, Button } from 'react-native'
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
    const { currentUser } = firebase.auth()
    this.setState({ currentUser })
    console.log(currentUser)
    console.log("this is user")
}

render() {
    const { currentUser } = this.state
    console.log(`${currentUser} hello`)

return (
      <View style={styles.container}>
        <Text>
          Hello {currentUser && currentUser.email}!
        </Text>
        <Button title="Log Out" onPress={this.handleLogOut} />
      </View>
    )
  }
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})
