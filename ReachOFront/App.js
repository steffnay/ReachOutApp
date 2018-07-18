import React from 'react'
import { StyleSheet, Platform, Image, Text, View } from 'react-native'
import { TabNavigator, SwitchNavigator, createSwitchNavigator, StackNavigator, createStackNavigator } from 'react-navigation'


// import the different screens
import Loading from './src/components/screens/Loading'
import SignUp from './src/components/screens/SignUp'
import Main from './src/components/screens/Main'
import LogOut from './src/components/screens/LogOut'
import Profile from './src/components/screens/Profile'
import Contacts from './src/components/screens/Contacts'
import EditContact from './src/components/screens/EditContact'
import EditProfile from './src/components/screens/EditProfile'
import Update from './src/components/screens/Update'
import History from './src/components/screens/History'

const StackContacts = StackNavigator({
  Contacts: { screen: Contacts },
  EditContact: { screen: EditContact}
}, {
  initialRouteName: 'Contacts',
})

const StackLog = StackNavigator({
  History: { screen: History },
  Update: { screen: Update}
}, {
  initialRouteName: 'History',
})

const StackProfile = StackNavigator({
  Profile: { screen: Profile },
  EditProfile: { screen: EditProfile}
}, {
  initialRouteName: 'Profile',
})

const Tabs = TabNavigator({
  Main: Main,
  Contacts: StackContacts,
  MoodLog: StackLog,
  Profile: StackProfile
}, {
  order: ['Main', 'Contacts', 'MoodLog', 'Profile'],
  animationEnabled: true,
},
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
