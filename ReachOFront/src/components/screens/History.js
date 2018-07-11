import React, { Component } from 'react'
import { View, Text, TouchableOpacity, Button } from 'react-native'

class History extends Component {


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
