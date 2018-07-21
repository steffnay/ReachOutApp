import React from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  processColor,
  Button,
  ScrollView
} from 'react-native';

import MoodChart from './MoodChart'

import {BarChart} from 'react-native-charts-wrapper';
import firebase from 'react-native-firebase'
import api from '../utilities/api'

const GREEN = processColor('#71BD6A');
const RED = processColor('#D14B5A');


class History extends React.Component {
  static navigationOptions = {
      header: null
   }

  constructor() {
   super();

   this.state = {
     chartData: [],
   };


  }

  componentDidMount() {
    const { currentUser } = firebase.auth();
    const uid = currentUser._user.uid
    this.makeWeekApiCall(uid)
  }


  makeWeekApiCall(uid) {
    api.getWeekLogData('0741709239').then((data) => {
      this.makeColorArray(data)
      this.setState({chartData: data})
      console.log('oOOOOOooOoOoooooooOooooo')
      console.log(this.state)
    })
  }

  makeMonthApiCall(uid) {
    api.getMonthLogData('0741709239').then((data)  => {
      this.makeColorArray(data)
      this.setState({chartData: data})

    })
  }

  makeColorArray(data) {

    console.log(data.length)
    const logNum = data.length
    let array = []

    for(let i=0; i < logNum; i++){
      array.push('GREEN')
    }
    console.log(array)
    this.setState({colorArray: array})

  }



 render() {
   const vals = [{y: -224.1}, {y: 238.5}, {y: 1280.1}]

   return (

     <View style={{flex: 1}}>
      <MoodChart logValues={ this.state.chartData } colors= { this.state.colorArray}/>
     </View>

   );
 }
}

const styles = StyleSheet.create({
 container: {
   flex: 1,
   backgroundColor: '#F5FCFF'
 },
 chart: {
   flex: 1
 }
});


export default History
