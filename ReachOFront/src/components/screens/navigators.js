import React from 'react'
import { StyleSheet, Platform, Image, Text, View } from 'react-native'
import { TabNavigator, SwitchNavigator, DrawerNavigator} from 'react-navigation'


// import the different screens
import Loading from './Loading'
import SignUp from './SignUp'
import Main from './Main'
import LogOut from './LogOut'
import Profile from './Profile'
import Contacts from './Contacts'
import EditContact from './EditContact'
import EditProfile from './EditProfile'
import History from './History'
import Update from './Update'


const Tabs = TabNavigator({
  profile: Profile,
  logout: LogOut,
  contacts: Contacts,

})


// create our app's navigation stack
const App = SwitchNavigator(
  {
    EditContact,
    Profile: Tabs,
    Loading,
    SignUp,

  },
  {
    initialRouteName: 'Loading'
  }
)
export default App
