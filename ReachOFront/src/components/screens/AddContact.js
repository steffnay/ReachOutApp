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
      if (text.length == 10) {
        const area = text.substr(0,3);
        const first = text.substr(3,3);
        const last = text.substr(6,4);
        text = `${area}-${first}-${last}`}
      else if (text.length > 10) {
        text = text.substr(0, 10)
      }
      this.setState({phone: text});
    }
    else if(field == 'email') {
      this.setState({email: text});
    }
  }


  componentDidMount = () => {
  }

  submit() {
    const { currentUser } = firebase.auth();
    const uid = currentUser._user.uid

    let collection = {}
    collection.first_name = this.state.first_name;
    collection.last_name = this.state.last_name;
    collection.phone = this.state.phone;
    collection.email = this.state.email;
    collection.id = uid;

    api.createContact(collection).then((response) => {
      const params = this.props.navigation.state;
      params.params.updateList();
      this.props.navigation.navigate('Contacts');
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
            keyboardType = {'phone-pad'}
            maxLength={10}
            onChangeText={(text) => this.updateValue(text,'phone')}
            />
        <TextInput placeholder= {"Email"}
          keyboardType={'email-address'}
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
    backgroundColor: '#fce0c7',
    flex: 1,
    justifyContent: 'center',
  },
  button: {
    backgroundColor: '#4a4a4a',
    height: 40,
    color: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  }
})

export default AddContact
