import React, { Component } from 'react'
import {
  View, StyleSheet,
  Text, Image,
  TouchableOpacity,
  Vibration, TextInput } from 'react-native'
import api from '../utilities/api'

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

  logStuff(info) {
    console.log("made it past update")
    console.log(info)

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
      console.log(params);
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
            onChangeText={(text) => this.updateValue(text,'phone')}
            />
        <TextInput placeholder= {this.state.email}
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

export default EditContact
