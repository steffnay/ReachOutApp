import React, { Component } from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import firebase from 'react-native-firebase'
import api from '../utilities/api'

import * as Animatable from 'react-native-animatable';
import Collapsible from 'react-native-collapsible';
import Accordion from 'react-native-collapsible/Accordion';

const SECTION = [];

class Contacts extends Component {
  state = {
      currentUser: null,
      contactList: null,
      }

  componentDidMount() {
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
        confirmed: list[c].confirmed
      }

      SECTION.push(contactHash)
    }

    while(SECTION.length < 3) {
      let emptytHash = {
        name: null,
        phone: null,
        confirmed: null
      };

      SECTION.push(emptytHash);
    }
  }



  render() {

    return (
      <View style={{height: 100 + "%",
        width: 100 + "%",
        flex: 1,
        justifyContent: "center",
        alignItems: "center"}}>

          <Text>CONTACTS PAGE</Text>
      </View>

    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#F5FCFF'
  },
  title: {
    textAlign: 'center',
    fontSize: 22,
    fontWeight: '300',
    marginBottom: 20
  },
  header: {
    backgroundColor: '#F5FCFF',
    padding: 10
  },
  headerText: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '500'
  },
  content: {
    padding: 20,
    backgroundColor: '#fff'
  },
  active: {
    backgroundColor: 'rgba(255,255,255,1)'
  },
  inactive: {
    backgroundColor: 'rgba(245,252,255,1)'
  },
  selectors: {
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'center'
  },
  selector: {
    backgroundColor: '#F5FCFF',
    padding: 10
  },
  activeSelector: {
    fontWeight: 'bold'
  },
  selectTitle: {
    fontSize: 14,
    fontWeight: '500',
    padding: 10
  }
});


export default Contacts
