import React, { Component } from 'react'
import { View, Text, TouchableOpacity, Button } from 'react-native'

class History extends Component {
  static navigationOptions = {
       header: null
   }

  render() {
    return (
      <View>

          <Text>MOOD HISTORY PAGE</Text>
          <Button
            title="Update Mood"
            onPress={() => this.props.navigation.navigate('Update')} />
      </View>

    )
  }
}

export default History
