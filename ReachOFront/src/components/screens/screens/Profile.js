import React, { Component } from 'react'
import { View, Text, TouchableOpacity, Button } from 'react-native'
import firebase from 'react-native-firebase'
import api from '../utilities/api'

import Icon from "react-native-vector-icons/MaterialIcons";

class Profile extends Component {
  constructor(props) {
    super(props)

    this.state = {
      currentUser: null,
    };
  }


  componentDidMount = () => {
    const { currentUser } = firebase.auth()
    this.setState({ user: currentUser._user })
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
      console.log("checking!!!")
      console.log(this.state.userData.displayName)
    })


  }

  render() {

    return (
      <View style={{height: 100 + "%",
        width: 100 + "%",
        flex: 1,
        justifyContent: "center",
        alignItems: "center"}}>
          <Text>PROFILE PAGE</Text>
          <Button
            title="Edit"
            onPress={() => this.props.navigation.navigate('EditProfile') }/>
      </View>

    )
  }
}

export default Profile