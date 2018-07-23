import React, { Component } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Button } from 'react-native'
import firebase from 'react-native-firebase'
import api from '../utilities/api'

import * as Animatable from 'react-native-animatable';
import Accordion from 'react-native-collapsible/Accordion';

let CONTENT = [];

class Contacts extends Component {
  static navigationOptions = {
      header: null
   }

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
    const userID = currentUser._user.uid
    this.setState({ currentUser: userID })
    console.log("returning contacts")

    this.makeApiCall()
  }

  makeApiCall = () => {
    api.getContacts(this.state.currentUser).then((contacts) => {
      this.setState({contactList: null})
        this.setState({ contactList: contacts})
        console.log(this.state)
      }).then (() => {
        CONTENT = []
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
        name: 'Empty Contact',
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

  reRenderContacts() {
    this.makeApiCall()
  }

  _renderContent = (section) => {
     let phone, button, confirmed = null;

      if (section.phone)
         phone = <Text>{section.phone}</Text>;
      if (section.confirmed == true)
        confirmed = <Text>Confirmed: True</Text>;
      if (section.confirmed == false)
        confirmed = <Text>Confirmed: False</Text>;

      if (section.button == "update"){

        button = (<View style=
          {{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Button
          title="EditContact"
          onPress={() => this.props.navigation.navigate('EditContact', {contact_id: section.id,
            updateList: () => {
              return this.reRenderContacts();
            }
            })} />
      </View>);
    }
    else if (section.button == "add"){

        button = (<View style=
          {{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Button
          title="Add Contact"
          onPress={() => this.props.navigation.navigate('AddContact', {
            updateList: () => {
              return this.reRenderContacts();
            }
            })} />
      </View>);
    }

     let content = <View>{phone}{confirmed}{button}</View>
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
