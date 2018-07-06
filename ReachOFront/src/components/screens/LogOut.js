
import React from 'react'
import { StyleSheet, Text, TextInput, View, Button } from 'react-native'
import firebase from 'react-native-firebase'


export default class SignUp extends React.Component {

  state = { email: '',
    password: '',
    errorMessage: null }

  handleLogOut = () => {
    firebase.auth().signOut()
    .then(() => this.props.navigation.navigate('Loading'))
      .catch(error => this.setState({ errorMessage: error.message }))
  }


render() {
    return (
      <View style={styles.container}>
        {this.state.errorMessage &&
          <Text style={{ color: 'red' }}>
            {this.state.errorMessage}
          </Text>}

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
  },
  textInput: {
    height: 40,
    width: '90%',
    borderColor: 'gray',
    borderWidth: 1,
    marginTop: 8
  }
})
