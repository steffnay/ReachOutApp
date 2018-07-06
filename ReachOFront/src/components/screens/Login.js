import React, { Component } from 'react'
import { View, Text, TouchableOpacity, TextInput, Button, StyleSheet } from 'react-native'



class Login extends Component {

  constructor () {
    super()
    this.state = {
      credentials: {
        login: "",
        password: "",
      }
    }
  }

  _fbAuth() {
    alert("fb auth")
  }

  updateText(text, field) {
    // do it this way with Object.assign because state is nested
    // and react wont know that the nested value has changed
    let newCredentials = Object.assign(this.state.credentials)
    newCredentials[field] = text
    this.setState({
      credentials: newCredentials
    })
  }


  register() {
    // send credentials to server if signup success...
      alert(JSON.stringify(this.state.credentials))
      this.props.navigation.navigate('main')
    // else error message...
  }


  render() {
    return (
      <View style={{height: 100 + "%",
        width: 100 + "%",
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        }}
      >

          <Text>LOGIN PAGE</Text>
          <TextInput value={this.state.login} onChangeText={text => this.updateText(text, 'login')} autoCorrect={false} placeholder="Username" style={styles.input}/>
          <TextInput value={this.state.password} onChangeText={text => this.updateText(text, 'password')} autoCorrect={false} secureTextEntry placeholder="Password" style={styles.input}/>
          <Button onPress={() => this.register()} title="Signup"/>
          <TouchableOpacity onPress={this._fbAuth}>
            <Text>Login with Facebook</Text>
          </TouchableOpacity>
      </View>

    )
  }
}

const styles = StyleSheet.create({
  input: {
    height: 50,
    width: 80 + "%",
    paddingHorizontal: 20,
    backgroundColor: "rgb(222,22,122)",
    marginBottom: 10,
  }

})

export default Login
