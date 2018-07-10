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
      this.setState({ backendData: user})
    }).then (() => {
      const firebaseUser = firebase.auth().currentUser
      this.setState({ userData: firebaseUser._user })
      console.log(this.state)
      console.log(firebaseUser) })

  }

  render() {


    return (
      <View style={{height: 100 + "%",
        width: 100 + "%",
        flex: 1,
        justifyContent: "center",
        alignItems: "center"}}>

          <Text>PROFILE PAGE</Text>
      </View>

    )
  }
}

export default Profile
