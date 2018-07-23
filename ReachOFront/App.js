import React from 'react'
import { StyleSheet, Platform, Image, Text, View } from 'react-native'
import { TabNavigator, SwitchNavigator, createSwitchNavigator, StackNavigator, createStackNavigator } from 'react-navigation'

import Icon from 'react-native-vector-icons/SimpleLineIcons';
import OneSignal from 'react-native-onesignal'; // Import package from node modules

// import the different screens
import Loading from './src/components/screens/Loading'
import SignUp from './src/components/screens/SignUp'
import Main from './src/components/screens/Main'
import LogOut from './src/components/screens/LogOut'
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

const Tabs = TabNavigator(
  {
    Main: {
    screen: Main,

    navigationOptions: {
      tabBarLabel:"",
      tabBarIcon: ({ tintColor }) => (
        <Icon name="home" size={20} color="#900" />
      )
    },
  },
  Contacts: {
    screen: StackContacts,

    navigationOptions: {
      tabBarLabel:"",
      tabBarIcon: ({ tintColor }) => (
        <Icon name="people" size={20} color="#900" />
      )
    },
  },
  MoodLog: {
    screen: StackLog,

    navigationOptions: {
      tabBarLabel:"",
      tabBarIcon: ({ tintColor }) => (
        <Icon name="graph" size={20} color="#900" />
      )
    },
  },
  Update: {
    screen: Update,

    navigationOptions: {
      tabBarLabel:"",
      tabBarIcon: ({ tintColor }) => (
        <Icon name="plus" size={20} color="#900" />
      )
    },
  },
},
  {
  order: ['Main', 'Contacts', 'Update', 'MoodLog'],
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

const Switch = createSwitchNavigator(
  {
    SignUp: SignUp,
    Loading: Loading,
    Main: Tabs,
  },
  {
    initialRouteName: 'Loading',
  }
);

export default class App extends React.Component {

  componentDidMount() {
      OneSignal.init("92d2170a-ed97-4c7b-8809-ef59a1b1a6be");

      OneSignal.addEventListener('received', this.onReceived);
      OneSignal.addEventListener('opened', this.onOpened);
      OneSignal.addEventListener('ids', this.onIds);
    }

    componentWillUnmount() {
        OneSignal.removeEventListener('received', this.onReceived);
        OneSignal.removeEventListener('opened', this.onOpened);
        OneSignal.removeEventListener('ids', this.onIds);
    }

    onReceived(notification) {
        console.log("Notification received: ", notification);
    }

    onOpened(openResult) {
      console.log('Message: ', openResult.notification.payload.body);
      console.log('Data: ', openResult.notification.payload.additionalData);
      console.log('isActive: ', openResult.notification.isAppInFocus);
      console.log('openResult: ', openResult);
    }

    onIds(device) {
		console.log('Device info: ', device);
    }

  render() {
    return <Switch />;
  }
}
// const AppStack = createStackNavigator(
//   {
//     MoodStuff: Tabs,
//     ProfileStuff: StackProfile,
//     ContactStuff: StackContacts,
//     });
