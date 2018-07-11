import React from 'react'
import { StyleSheet, Platform, Image, Text, View } from 'react-native'
import { TabNavigator, SwitchNavigator, createStackNavigator } from 'react-navigation'
import { Icon } from 'react-native-elements';

import Main from './Main'
import Profile from './Profile'



export const Tabs = TabNavigator({
  MainScreen: {
    screen: Main },
  ProfileScreen: {
    screen: Profile },
})
