import React, { Component } from 'react'
import { View, Text, TouchableOpacity, Button } from 'react-native'
import firebase from 'react-native-firebase'
import api from '../utilities/api'

import Icon from "react-native-vector-icons/MaterialIcons";

class Profile extends Component {
  static navigationOptions = {
      header: null
   }

  constructor(props) {
    super(props)

    this.state = {
      currentUser: null,
    };
  }



  componentDidMount = () => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ user: user._user })
    } else {
      // No user is signed in.
    }
  });
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
