import React from 'react'
import { StyleSheet, Platform, Image, Text, View } from 'react-native'
import { TabNavigator, SwitchNavigator, createSwitchNavigator, StackNavigator, createStackNavigator } from 'react-navigation'
import Icon from 'react-native-vector-icons/FontAwesome';

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
import AddContact from './src/components/screens/AddContact'

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
