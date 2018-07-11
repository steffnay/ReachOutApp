import React, { Component } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Button } from 'react-native'
import firebase from 'react-native-firebase'
import api from '../utilities/api'

import * as Animatable from 'react-native-animatable';
import Accordion from 'react-native-collapsible/Accordion';

const CONTENT = [];

class Contacts extends Component {
  constructor(props) {
    super(props)

    this.state = {
      currentUser: null,
      contactList: null,
      activeSection: false,
      collapsed: true
    };
  }

  componentDidMount() {
    this.setState({contactList: null})
    const { currentUser } = firebase.auth()
    this.setState({ currentUser })
    console.log("returning contacts")

    api.getContacts(1).then((contacts) => {
        this.setState({ contactList: contacts})
        console.log(this.state)
      }).then (() => {
        this.makeSections()
      })
      .then (() => {
        const firebaseUser = firebase.auth().currentUser
        this.setState({ userData: firebaseUser._user })

    })
  }

  makeSections() {
    let list = this.state.contactList.contacts;
    for (let c in list) {

      let contactHash = {
        name: `${list[c].first_name} ${list[c].last_name}`,
        phone: list[c].phone,
        confirmed: list[c].confirmed,
        button: "update",
        id: list[c].id
      }

      CONTENT.push(contactHash)
    }

    while(CONTENT.length < 3) {
      let emptytHash = {
        name: null,
        phone: null,
        confirmed: null,
        button: "add",
        id: null
      };

      CONTENT.push(emptytHash);
    }
  }

  _toggleExpanded = () => {
    this.setState({ collapsed: !this.state.collapsed });
  };

  _setSection(section) {
    this.setState({ activeSection: section });
  }

  _renderHeader(section, i, isActive) {
    return (
      <Animatable.View
        duration={400}
        style={[styles.header, isActive ? styles.active : styles.inactive]}
        transition="backgroundColor"
      >
        <Text style={styles.headerText}>{section.name}</Text>
      </Animatable.View>
    );
  }

  _renderContent = (section) => {
     let phone, button = null;


     if (section.phone)
         phone = <Text>{section.phone}</Text>;

     if (section.button == "update"){

        button = (<View style=
          {{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Button
          title="Go to Details"
          onPress={() => this.props.navigation.navigate('EditContact', {contact_id: 5} )} />
      </View>);
    }

     let content = <View>{phone}{button}</View>
     return content;
  }

  render() {

    return (
      <View>
       <Accordion
         activeSection={this.state.activeSection}
         sections={CONTENT}
         touchableComponent={TouchableOpacity}
         renderHeader={this._renderHeader}
         renderContent={this._renderContent}
         duration={400}
         onChange={this._setSection.bind(this)}
       />
     </View>

    )
  }
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#F5FCFF',
    padding: 10
  },
  headerText: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '500'
  },
  active: {
    backgroundColor: 'rgba(255,255,255,1)'
  },
  inactive: {
    backgroundColor: 'rgba(245,252,255,1)'
  }
});


export default Contacts
