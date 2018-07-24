import React, { Component } from 'react'
import {
  View, StyleSheet,
  Text, Image,
  TouchableOpacity,
  Vibration, TextInput, Alert } from 'react-native'
import api from '../utilities/api'
import {MaskedInput} from 'react-native-ui-lib';
import { TabNavigator, SwitchNavigator, createSwitchNavigator, StackNavigator, createStackNavigator } from 'react-navigation'


class EditContact extends Component {


  constructor(props) {
    super(props)

    this.state = {
      id: null,
      first_name: '',
      last_name: '',
      email: '',
      phone: '',
      confirmed: null,
    };
  }

  updateValue(text, field) {
    if(field == 'first_name') {
      this.setState({first_name: text})
    }
    else if(field == 'last_name') {
      this.setState({last_name: text})
    }
    else if(field == 'phone') {
      if (text.length == 10) {
        const area = text.substr(0,3)
        const first = text.substr(3,3)
        const last = text.substr(6,4)
        text = `${area}-${first}-${last}`
      }
      else if (text.length > 10) {
        text = text.substr(0, 10)
      }
  
      this.setState({phone: text})
    }
    else if(field == 'email') {
      this.setState({email: text})
    }
  }


  componentDidMount = () => {
    const id = this.props.navigation.getParam('contact_id', 5);
    this.setState({id: id})

    api.getContactInfo(id).then((contact) => {
        this.setState({
          first_name: contact.first_name,
          last_name: contact.last_name,
          email: contact.email,
          phone: contact.phone,
          confirmed: contact.confirmed,})
        console.log("console state.....")
        console.log(this.state)
      })
  }

  // logStuff(info) {
  //   console.log("made it past update")
  //   console.log(info)
  //
  // }

  submit() {
    let collection = {}
    collection.first_name = this.state.first_name,
    collection.last_name = this.state.last_name,
    collection.phone = this.state.phone,
    collection.email = this.state.email,
    collection.id = this.state.id;

    api.updateContact(collection).then((contact) => {
      const params = this.props.navigation.state;
      this.setState(contact);
      params.params.updateList();
      this.props.navigation.navigate('Contacts')
    })
  }

  deleteAlert() {
    Alert.alert(
    'Are you sure?',
    `Remove ${this.state.first_name}?`,
    [
      {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
      {text: 'OK', onPress: () => this.deleteContact()},
    ],
    { cancelable: false }
    )
  }

  deleteContact() {
    api.deleteContact(this.state.id).then((data) => {
      console.log('~* DELETE RESPONSE....')
      console.log(data)
      const params = this.props.navigation.state;
      params.params.updateList();
      this.props.navigation.navigate('Contacts')
    })
  }


  render() {

    return (
      <View style={styles.container}>
        <TextInput placeholder= {this.state.first_name}
          style = {styles.input}
          onChangeText={(text) => this.updateValue(text,'first_name')}
          />
        <TextInput placeholder= {this.state.last_name}
            style = {styles.input}
            onChangeText={(text) => this.updateValue(text,'last_name')}
            />
        <TextInput placeholder= {this.state.phone}
            style = {styles.input}
            keyboardType = {'phone-pad'}
            maxLength={10}
            onChangeText={(text) => this.updateValue(text,'phone')}
            />
        <TextInput placeholder= {this.state.email}
          keyboardType={'email-address'}
          style = {styles.input}
          onChangeText={(text) => this.updateValue(text,'email')}
          />

        <TouchableOpacity onPress={()=>this.submit()}
          style={styles.button}>
          <Text>Submit</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={()=>this.deleteAlert()}
          style={styles.button}>
          <Text>Delete Contact</Text>
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

export default EditContact
