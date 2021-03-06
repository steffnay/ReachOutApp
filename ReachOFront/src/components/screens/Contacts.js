import React, { Component } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Button, ImageBackground } from 'react-native'
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
    super(props);

    const { currentUser } = firebase.auth();
    const userID = currentUser._user.uid;

    this.state = {
      currentUser: userID,
      contactList: null,
      activeSection: false,
      collapsed: true
    };
  }

  componentDidMount() {
    this.setState({contactList: null});
    const { currentUser } = firebase.auth();
    const userID = currentUser._user.uid;
    this.setState({ currentUser: userID });
    this.makeApiCall();
  }

  makeApiCall = () => {
    api.getContacts(this.state.currentUser).then((contacts) => {
      this.setState({contactList: null});
      this.setState({ contactList: contacts});
      }).then (() => {
        CONTENT = []
        this.makeSections();
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
      };

      CONTENT.push(contactHash);
    }

    while(CONTENT.length < 3) {
      let emptyHash = {
        name: 'Empty Contact',
        phone: null,
        confirmed: null,
        button: "add",
        id: null
      };

      CONTENT.push(emptyHash);
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
    this._setSection(null)
    this.makeApiCall();
  }

  _renderContent = (section) => {
   let phone, button, confirmed = null;

    if (section.phone)
       phone = <Text style={{fontSize: 18, color: 'black'}}>{section.phone}</Text>;
    if (section.confirmed == true)
      confirmed = <Text style={{fontSize: 18, color: 'black'}}>Confirmed: True</Text>;
    if (section.confirmed == false)
      confirmed = <Text style={{fontSize: 18, color: 'black'}}>Confirmed: False</Text>;

    if (section.button == "update"){
      button = (
      <View style=
        {{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Button
          color='#4a4a4a'
          title="Edit"
          onPress={() => this.props.navigation.navigate('EditContact', {contact_id: section.id,
            updateList: () => {
              return this.reRenderContacts();
            }
            })} />
      </View>);
    }
    else if (section.button == "add"){
      button = (
      <View style=
        {{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Button
          color='#4a4a4a'
          title="Add"
          onPress={() => this.props.navigation.navigate('AddContact', {
            updateList: () => {
              return this.reRenderContacts();
            }
          })
        } />
      </View>);
    }

    let content = (
      <View style={{backgroundColor: 'rgba(255,255,255,0.2)', padding: 20 }}>
        <View style={styles.contentContainer}>
          <View>{phone}</View><View>{confirmed}</View>
        </View>
        <View style={{paddingTop: 5}}>{button}</View>
      </View>)
    return content;
  }


  render() {

    return (
      <ImageBackground source={require('../utilities/ReachOutTransparent1.png')} style={styles.backgroundImage}>
        <View>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>I can reach out to...</Text>
          </View>
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
     </ImageBackground>

    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 50,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleContainer: {
    marginTop: 70,
  },
  header: {
    padding: 10,
  },
  title: {
    fontSize: 30,
    textAlign: 'center',
    paddingBottom: 50,
    fontWeight: '500',
    color: 'black',
  },
  headerText: {
    textAlign: 'center',
    fontSize: 26,
    fontWeight: '400',
    paddingBottom: 0,
    color: 'black',
    // textDecorationLine: 'underline'
  },
  contentContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginRight: 20,
    marginLeft: 20,
    paddingBottom: 10,
  },
  button: {
    flex: 1,
    backgroundColor: '#4a4a4a',
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    width: 30,
    margin: 5
  },
  active: {
    backgroundColor: 'rgba(255,255,255,0.2)',
  },
  inactive: {
    backgroundColor: 'rgba(245,252,255,0.0)',
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover', // or 'stretch'
  }
});


export default Contacts
