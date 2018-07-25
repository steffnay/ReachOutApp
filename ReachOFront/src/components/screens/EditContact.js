import React, { Component } from 'react'
import {
  View, StyleSheet,
  Text, Image, ScrollView,
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
      })
  }

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
      const params = this.props.navigation.state;
      params.params.updateList();
      this.props.navigation.navigate('Contacts')
    })
  }


  render() {

    return (
      <ScrollView style={{backgroundColor:'#fce0c7'}}>
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
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={()=>this.submit()}
            style={styles.button}>
            <Text style={{color: 'white'}}>Submit</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={()=>this.deleteAlert()}
            style={styles.button}>
            <Text style={{color: 'white'}}>Delete Contact</Text>
          </TouchableOpacity>
        </View>


      </View>
      </ScrollView>

    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fce0c7',
    flex: 1,
    justifyContent: 'center',
    marginTop: 60,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 40,
    marginRight: 40,
  },
  button: {
    flex: 1,
    backgroundColor: '#4a4a4a',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    width: 30,
    margin: 5
  },
  input: {
    height: 50,
    fontSize: 20,
    marginLeft: 40,
    marginRight: 40,
    paddingTop: 10,
    paddingBottom: 10,
  }
})

export default EditContact
