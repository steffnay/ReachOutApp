import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { Contacts, Login, Register, Log, Update, Profile } from "./components/screens"
import {TabNavigator, SwitchNavigator, StackNavigator} from 'react-navigation'

// example if we needed another one within profile page
// const ProfileStack = StackNavigator({
//   screen1: AnotherComponent,
//   screen2: Component2
// })

const Tabs = TabNavigator({
  profile: Profile,
  contacts: Contacts,
  log: Log,
  update: Update,

})

// this has only two options
const IntroStack = StackNavigator({
  register: Register,
  login: Login,
})


const MainStack = SwitchNavigator({
  intro: IntroStack,
  main: Tabs,

})


class ReachOut extends Component {
  render() {
    return (
      <MainStack />

    )
  }
}
export default ReachOut;
