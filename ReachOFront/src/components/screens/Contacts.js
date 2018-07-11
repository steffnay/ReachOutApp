import React, { Component } from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import firebase from 'react-native-firebase'
import api from '../utilities/api'

import * as Animatable from 'react-native-animatable';
import Collapsible from 'react-native-collapsible';
import Accordion from 'react-native-collapsible/Accordion';

const CONTENT = [];

class Contacts extends Component {
  state = {
      currentUser: null,
      contactList: null,
      activeSection: false,
      collapsed: true
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

      CONTENT.push(contactHash)
    }

    while(CONTENT.length < 3) {
      let emptytHash = {
        name: null,
        phone: null,
        confirmed: null
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


  _renderContent(section, i, isActive) {
    return (
      <Animatable.View
        duration={400}
        style={[styles.content, isActive ? styles.active : styles.inactive]}
        transition="backgroundColor"
      >
        <Animatable.Text animation={isActive ? 'bounceIn' : undefined}>
          {section.phone}
        </Animatable.Text>
      </Animatable.View>
    );
  }

  // <View style={{height: 100 + "%",
  //   width: 100 + "%",
  //   flex: 1,
  //   justifyContent: "center",
  //   alignItems: "center"}}>
  //
  //     <Text>CONTACTS PAGE</Text>
  // </View>

  render() {

    return (
      <View>
        <TouchableOpacity onPress={this._toggleExpanded}>
           <View style={styles.header}>
             <Text style={styles.headerText}>Single Collapsible</Text>
           </View>
         </TouchableOpacity>
         <Collapsible collapsed={this.state.collapsed} align="center">
           <View style={styles.content}>
             <Text>
               Bacon ipsum dolor amet chuck turducken landjaeger tongue spare
               ribs
             </Text>
           </View>
         </Collapsible>
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
