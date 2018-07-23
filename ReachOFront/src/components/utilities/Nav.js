import React, { Component } from 'react'
import { StyleSheet, Platform, Image, Text, View } from 'react-native'
import { TabNavigator, SwitchNavigator, createSwitchNavigator, StackNavigator, createStackNavigator } from 'react-navigation'
import Icon from 'react-native-vector-icons/FontAwesome';

// import the different screens
import Loading from '../screens/Loading'
import SignUp from '../screens/SignUp'
import Main from '../screens/Main'
import LogOut from '../screens/LogOut'
import Profile from '../screens/Profile'
import Contacts from '../screens/Contacts'
import EditContact from '../screens/EditContact'
import EditProfile from '../screens/EditProfile'
import Update from '../screens/Update'
import History from '../screens/History'
import AddContact from '../screens/AddContact'



console.disableYellowBox = true;

const StackContacts = StackNavigator({
  Contacts: { screen: Contacts },
  EditContact: { screen: EditContact},
  AddContact: { screen: AddContact}
}, {
  initialRouteName: 'Contacts',
})

const StackLog = StackNavigator({
  History: { screen: History }
}, {
  initialRouteName: 'History',
})

const StackProfile = StackNavigator({
  Profile: { screen: Profile },
  EditProfile: { screen: EditProfile}
}, {
  initialRouteName: 'Profile',
})

const Tabs = TabNavigator(
  {
    Main: {
    screen: Main,

    navigationOptions: {
      tabBarLabel:"",
      tabBarIcon: ({ tintColor }) => (
        <Icon name="home" size={30} color="#900" />
      )
    },
  },
  Contacts: {
    screen: StackContacts,

    navigationOptions: {
      tabBarLabel:"",
      tabBarIcon: ({ tintColor }) => (
        <Icon name="home" size={30} color="#900" />
      )
    },
  },
  MoodLog: {
    screen: StackLog,

    navigationOptions: {
      tabBarLabel:"",
      tabBarIcon: ({ tintColor }) => (
        <Icon name="home" size={30} color="#900" />
      )
    },
  },
  Profile: {
    screen: StackProfile,

    navigationOptions: {
      tabBarLabel:"",
      tabBarIcon: ({ tintColor }) => (
        <Icon name="home" size={30} color="#900" />
      )
    },
  },
  MoodLog: {
    screen: StackLog,

    navigationOptions: {
      tabBarLabel:"",
      tabBarIcon: ({ tintColor }) => (
        <Icon name="home" size={30} color="#900" />
      )
    },
  },
  Update: {
    screen: Update,

    navigationOptions: {
      tabBarLabel:"",
      tabBarIcon: ({ tintColor }) => (
        <Icon name="home" size={30} color="#900" />
      )
    },
  },
},
  {
  order: ['Main', 'Contacts', 'Update', 'MoodLog', 'Profile'],
  animationEnabled: true,
  tabBarOptions: {
      showLabel: false,
      showIcon: true,
      activeTintColor: '#D4AF37',
      inactiveTintColor: 'gray',
      style: {
        backgroundColor: 'white',
      }
    },
  }
)

// const AppStack = createStackNavigator(
//   {
//     MoodStuff: Tabs,
//     ProfileStuff: StackProfile,
//     ContactStuff: StackContacts,
//     });
 
export default createSwitchNavigator(
  {
    SignUp: SignUp,
    Loading: Loading,
    Main: Tabs,
  },
  {
    initialRouteName: 'Loading',
  }
);
