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
    alert(text)
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
          cofirmed: contact.confirmed,})
        console.log("console state.....")
        console.log(this.state)
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

        <TouchableOpacity style={styles.button}>
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
