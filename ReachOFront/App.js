import React from 'react'
import { StyleSheet, Platform, Image, Text, View } from 'react-native'
import { TabNavigator, SwitchNavigator } from 'react-navigation'


// import the different screens
import Loading from './src/components/screens/Loading'
import SignUp from './src/components/screens/SignUp'
import Main from './src/components/screens/Main'
import LogOut from './src/components/screens/LogOut'
import Profile from './src/components/screens/Profile'
import Contacts from './src/components/screens/Contacts'
import EditContact from './src/components/screens/EditContact'


const Tabs = TabNavigator({
  profile: Profile,
  logout: LogOut,
  contacts: Contacts,

})


// create our app's navigation stack
const App = SwitchNavigator(
  {
    EditContact,
    Profile,
    Loading,
    SignUp,
    Main: Tabs,
  },
  {
    initialRouteName: 'Loading'
  }
)
export default App
