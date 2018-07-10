import React, { Component } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import firebase from 'react-native-firebase'
import api from '../utilities/api'

class Profile extends Component {
  state = { currentUser: null }
  componentDidMount() {
    const { currentUser } = firebase.auth()
    this.setState({ currentUser })
    console.log(`current user: ${currentUser}`)

    api.getUser(1).then((user) =>{
      console.log('hello')
      let phone = user["phone"]
      console.log(`API info: ${phone}`)
    })
  }

  render() {
    const user = firebase.auth().currentUser

    return (
      <View style={{height: 100 + "%",
        width: 100 + "%",
        flex: 1,
        justifyContent: "center",
        alignItems: "center"}}>
          <Text>{user._user.displayName}</Text>
          <Text>PROFILE PAGE</Text>
      </View>

    )
  }
}

export default Profile
