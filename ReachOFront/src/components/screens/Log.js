import React, { Component } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'

class Log extends Component {

  login() {
    this.props.navigation.navigate('main')
  }


  render() {
    return (
      <TouchableOpacity style={{height: 100 + "%",
        width: 100 + "%",
        flex: 1,
        justifyContent: "center",
        alignItems: "center"}}
        onPress={()=>this.login()}>

          <Text>LOG PAGE</Text>
      </TouchableOpacity>

    )
  }
}

export default Log
