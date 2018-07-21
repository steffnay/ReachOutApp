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

      const dataLength = data.length
      let dataArray = []

      for(let i=0; i < dataLength; i++){
        let yVal = data[i].primary_mood
        let yObject = {y: yVal}
        dataArray.push(yObject)
      }

      this.setState({chartData: dataArray})
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

    const dataLength = data.length;
    let colorArray = []

    for(let i=0; i < dataLength; i++){
      let primary = data[i].primary_mood;
      let intensity = data[i].intensity;
      let color = this.checkColor(primary, intensity);

      colorArray.push(color)
      this.setState({colorArray: colorArray})
    }

  }

  checkColor(primary, intensity) {
    if (primary > -1) {
      if (intensity > -1 && intensity < 3) {
        return '#FFFFD9'
      }
      else if (intensity == 3 || intensity == 4) {
        return '#FFFFB2'
      }
      else if (intensity == 5 || intensity == 6) {
        return '#FFFF8C'
      }
      else if (intensity == 7 || intensity == 8) {
        return '#FFFF66'
      }
      else if (intensity == 9 || intensity == 10) {
        return '#FFFF00'
      }
      else if (intensity < 0 && intensity > -3) {
        return '#E7FFE7'
      }
      else if (intensity == -3 || intensity == -4) {
        return '#C1FFC1'
      }
      else if (intensity == -5 || intensity == -6) {
        return '#90EE90'
      }
      else if (intensity == -7 || intensity == -8) {
        return '#5BC85B'
      }
      else if (intensity == -9 || intensity == -10) {
        return '#31A231'
      }
    }
    else if (primary < 0) {
      if (intensity > -1 && intensity < 3) {
        return '#FF7373'
      }
      else if (intensity == 3 || intensity == 4) {
        return '#FF4C4C'
      }
      else if (intensity == 5 || intensity == 6) {
        return '#FF2626'
      }
      else if (intensity == 7 || intensity == 8) {
        return '#D90000'
      }
      else if (intensity == 9 || intensity == 10) {
        return '#B20000'
      }
      else if (intensity < 0 && intensity > -3) {
        return '#EBF5FF'
      }
      else if (intensity == -3 || intensity == -4) {
        return '#C4E3FF'
      }
      else if (intensity == -5 || intensity == -6) {
        return '#9ED1FF'
      }
      else if (intensity == -7 || intensity == -8) {
        return '#78BFFF'
      }
      else if (intensity == -9 || intensity == -10) {
        return '#4593D9'
      }
    }
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
