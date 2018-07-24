import React from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  processColor,
  Button,
  ScrollView,
  TouchableOpacity
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
     colorArray: []
   };


  }

  componentDidMount() {
    const { currentUser } = firebase.auth();
    const uid = currentUser._user.uid
    this.setState({currentUser: uid})
    this.makeWeekApiCall(uid)
  }


  makeWeekApiCall(uid) {
    api.getWeekLogData(uid).then((data) => {

      const dataLength = data.length
      let dataArray = []

      for(let i=0; i < dataLength; i++){
        let yVal = data[i].primary_mood
        let yObject = {y: yVal}
        dataArray.push(yObject)
      }

      this.setState({chartData: dataArray});
      this.makeColorArray(data);
      this.makeLabelArray(data);

      console.log('oOOOOOooOoOoooooooOooooo');
      console.log(this.state);
      console.log('oOOOOOooOoOoooooooOooooo');
    })
  }

  makeMonthApiCall(uid) {
    api.getMonthLogData(uid).then((data) => {

      const dataLength = data.length
      let dataArray = []

      for(let i=0; i < dataLength; i++){
        let yVal = data[i].primary_mood
        let yObject = {y: yVal}
        dataArray.push(yObject)
      }

      this.setState({chartData: dataArray});
      this.makeColorArray(data);
      this.makeLabelArray(data);

      console.log('oOOOOOooOoOoooooooOooooo');
      console.log(this.state);
      console.log('oOOOOOooOoOoooooooOooooo');
    })
  }

  makeColorArray(data) {
    const dataLength = data.length;
    let colorArray = []

    for(let i=0; i < dataLength; i++){
      let primary = data[i].primary_mood;
      let intensity = data[i].intensity;
      let color = this.checkColor(primary, intensity);

      colorArray.push(color);
      this.setState({colorArray: colorArray});
    }
  }

  checkColor(primary, intensity) {
    if (primary > -1) {
      if (intensity > -1 && intensity < 3) {
        return processColor('#FFFFD9')
      }
      else if (intensity == 3 || intensity == 4) {
        return processColor('#FFFFB2')
      }
      else if (intensity == 5 || intensity == 6) {
        return processColor('#FFFF8C')
      }
      else if (intensity == 7 || intensity == 8) {
        return processColor('#FFFF66')
      }
      else if (intensity == 9 || intensity == 10) {
        return processColor('#FFFF00')
      }
      else if (intensity < 0 && intensity > -3) {
        return processColor('#E7FFE7')
      }
      else if (intensity == -3 || intensity == -4) {
        return processColor('#C1FFC1')
      }
      else if (intensity == -5 || intensity == -6) {
        return processColor('#90EE90')
      }
      else if (intensity == -7 || intensity == -8) {
        return processColor('#5BC85B')
      }
      else if (intensity == -9 || intensity == -10) {
        return processColor('#31A231')
      }
    }
    else if (primary < 0) {
      if (intensity > -1 && intensity < 3) {
        return processColor('#FF7373')
      }
      else if (intensity == 3 || intensity == 4) {
        return processColor('#FF4C4C')
      }
      else if (intensity == 5 || intensity == 6) {
        return processColor('#FF2626')
      }
      else if (intensity == 7 || intensity == 8) {
        return processColor('#D90000')
      }
      else if (intensity == 9 || intensity == 10) {
        return processColor('#B20000')
      }
      else if (intensity < 0 && intensity > -3) {
        return processColor('#EBF5FF')
      }
      else if (intensity == -3 || intensity == -4) {
        return processColor('#C4E3FF')
      }
      else if (intensity == -5 || intensity == -6) {
        return processColor('#9ED1FF')
      }
      else if (intensity == -7 || intensity == -8) {
        return processColor('#78BFFF')
      }
      else if (intensity == -9 || intensity == -10) {
        return processColor('#4593D9')
      }
    }
  }

  makeLabelArray(data) {
    const dataLength = data.length;
    let labelArray = []

    for(let i=0; i < dataLength; i++){
      let primary = data[i].primary_mood;
      let intensity = data[i].intensity;
      let label = this.checkLabel(primary, intensity);

      labelArray.push(label);
      this.setState({labelArray: labelArray});
    }
  }

  checkLabel(primaryMood, intensity) {
  // Q1
    if (intensity > -1 &&
      primaryMood > 0 &&
      primaryMood < 4) {
      return ('Alert')
    }
    else if (intensity > -1 &&
      primaryMood > 3 &&
      primaryMood < 6) {
      return ('Excited')
      }
    else if (intensity > -1 &&
      primaryMood > 5 &&
      primaryMood < 9) {
      return ('Happy')
    }
    else if (intensity > -1 &&
      primaryMood > 8 &&
      primaryMood < 11) {
      return ('Elated')
    }
    // Q2
    if (intensity < 0 &&
      primaryMood > 0 &&
      primaryMood < 4) {
      return ('Calm')
    }
    else if (intensity < 0 &&
      primaryMood > 3 &&
      primaryMood < 6) {
      return ('Relaxed')
      }
    else if (intensity < 0 &&
      primaryMood > 5 &&
      primaryMood < 9) {
      return ('Serene')
    }
    else if (intensity < 0 &&
      primaryMood > 9 &&
      primaryMood < 11) {
      return ('Contented')
    }
    // Q3
    if (intensity < 0 &&
      primaryMood < 0 &&
      primaryMood > -4) {
      return ('Fatigued')
    }
    else if (intensity < 0 &&
      primaryMood < -3 &&
      primaryMood > -6) {
      return ('Bored')
      }
    else if (intensity < 0 &&
      primaryMood < -5 &&
      primaryMood > -9) {
      return ('Depressed')
    }
    else if (intensity < 0 &&
      primaryMood < -8 &&
      primaryMood > -11) {
      return ('Sad')
    }
    // Q4
    if (intensity > -1 &&
      primaryMood < 0 &&
      primaryMood > -4) {
      return ('Tense')
    }
    else if (intensity > -1 &&
      primaryMood < -3 &&
      primaryMood > -6) {
      return ('Nervous')
      }
    else if (intensity > -1 &&
      primaryMood < -5 &&
      primaryMood > -9) {
      return ('Stressed')
    }
    else if (intensity > -1 &&
      primaryMood < -8 &&
      primaryMood > -11) {
      return ('Upset')
    }

    console.log("blah ~ blah ~ blah ~ blah LABELS LABELS LABELS")
    console.log(this.state.label)
  }




  renderChart() {
    if (this.state.chartData.length > 0 && this.state.colorArray.length > 0 &&
        this.state.chartData.length == this.state.colorArray.length) {
      console.log("this is calling because chart data is full")
      return (
        <MoodChart logValues={this.state.chartData} colors={this.state.colorArray} labels={this.state.labelArray}/>
      );
    }
    else {
      console.log("this is calling because chart data is empty")
      return (
          <Text>~*Loading*~</Text>
      );
    }
  }

render() {
   const moodVals = [{y: -10}, {y: -10}, {y: -10}, {y: -10}, {y: -10},
     {y: -10}, {y: -10}, {y: -10}, {y: -10}, {y: -10},
     {y: -10}, {y: -10}, {y: -10}, {y: -10}, {y: -10}, {y: -10},
     {y: 5}, {y: -2}, {y: -5}, {y: 5}, {y: 5}]

    const colorVals = [-12217383, -12217383, -12217383, -12217383, -12217383, -12217383,
      -12217383, -12217383, -12217383, -12217383, -12217383, -12217383, -12217383,
      -12217383, -12217383, -12217383, -39, -35981, -2555904, -10762149, -10762149]


   return (
     <View style={styles.container}>
       {this.renderChart()}
       <View style={styles.buttonContainer}>
         <TouchableOpacity onPress={()=>this.makeWeekApiCall(this.state.currentUser)}
           style={styles.button}>
           <Text>This Week</Text>
         </TouchableOpacity>
         <TouchableOpacity onPress={()=>this.makeMonthApiCall(this.state.currentUser)}
           style={styles.button}>
           <Text>This Month</Text>
         </TouchableOpacity>
       </View>
     </View>
   );
 }
}

const styles = StyleSheet.create({
 container: {
   backgroundColor: '#fce0c7',
   flex: 1,
   justifyContent: 'center',
 },
 buttonContainer: {
   flex: 1,
   paddingBottom: 0,
   flexDirection: 'row',
   justifyContent: 'space-around',
   alignItems: 'center',
 },
 button: {

 }
});


export default History
