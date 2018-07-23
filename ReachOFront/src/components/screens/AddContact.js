import React, { Component } from 'react'
import {
  View, StyleSheet,
  Text, Image,
  TouchableOpacity,
  Vibration, TextInput } from 'react-native'

import api from '../utilities/api'
import firebase from 'react-native-firebase'

class AddContact extends Component {
  constructor(props) {
    super(props)

    this.state = {
      id: null,
      first_name: '',
      last_name: '',
      email: '',
      phone: '',
    };
  }

  updateValue(text, field) {
    if(field == 'first_name') {
      this.setState({first_name: text,})
    }
    else if(field == 'last_name') {
      this.setState({last_name: text,})
    }
    else if(field == 'phone') {
      this.setState({phone: text,})
    }
    else if(field == 'email') {
      this.setState({email: text})
    }
  }


  componentDidMount = () => {
  }

  submit() {
    const { currentUser } = firebase.auth();
    const uid = currentUser._user.uid

    let collection = {}
    collection.first_name = this.state.first_name
    collection.last_name = this.state.last_name
    collection.phone = this.state.phone
    collection.email = this.state.email
    collection.uid = uid

    console.log(collection)

    api.createContact(collection).then(() => {
      const params = this.props.navigation.state;
      params.params.updateList();
      this.props.navigation.navigate('Contacts')
    })
  }


  render() {

    return (
      <View style={styles.container}>
        <TextInput placeholder= {'First name'}
          style = {styles.input}
          onChangeText={(text) => this.updateValue(text,'first_name')}
          />
        <TextInput placeholder= {'Last Name'}
            style = {styles.input}
            onChangeText={(text) => this.updateValue(text,'last_name')}
            />
        <TextInput placeholder= {'Phone'}
            style = {styles.input}
            onChangeText={(text) => this.updateValue(text,'phone')}
            />
        <TextInput placeholder= {"Email"}
          style = {styles.input}
          onChangeText={(text) => this.updateValue(text,'email')}
          />

        <TouchableOpacity onPress={()=>this.submit()}
          style={styles.button}>
          <Text>Submit</Text>
        </TouchableOpacity>


      </View>

    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F5FCFF',
    flex: 1,
    justifyContent: 'center',
  },
  button: {
    backgroundColor: 'skyblue',
    height: 40,
    color: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  }
})

export default AddContact
