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

import {BarChart} from 'react-native-charts-wrapper';
import PropTypes from 'prop-types';

const GREEN = processColor('#71BD6A');
const RED = processColor('#D14B5A');


class MoodChart extends React.Component {
  static navigationOptions = {
      header: null
   }

  constructor(props) {
   super(props);

   this.state = {
     data: {
       dataSets: [{
         values: props.logValues,
         label: 'Zero line dataset',
         config: {
           colors: props.colors
         }
       }],
     },
     xAxis: {
       enabled: false
     },
     yAxis: {
       left: {
         drawLabels: false,
         drawAxisLine: false,
         drawGridLines: false,
         zeroLine: {
           enabled: true,
           lineWidth: 1.5
         }
       },
       right: {
         enabled: false
       }
     }
   };
 }

 componentDidMount() {

   console.log('%%%%%%%%%%%%%%%%%%%%')
   console.log(this.state)
   console.log(this.props)
  console.log('%%%%%%%%%%%%%%%%%%%%')
  // const logNum = this.state.chartData.length
  //
  // let array = []
  //
  // for(let i=0; i < logNum; i++){
  //   array.push('GREEN')
  // }
  //
  // this.setState()
 }

 handleSelect(event) {
   let entry = event.nativeEvent
   if (entry == null) {
     this.setState({...this.state, selectedEntry: null})
   } else {
     this.setState({...this.state, selectedEntry: JSON.stringify(entry)})
   }

   console.log(event.nativeEvent)
 }

 render() {
   return (

     <View style={{flex: 1}}>

       <View style={{height:80}}>
         <Text> selected entry</Text>
         <Text> {this.state.selectedEntry}</Text>
       </View>

       <View style={styles.container}>
         <BarChart
           style={styles.chart}
           data={this.state.data}
           xAxis={this.state.xAxis}
           yAxis={this.state.yAxis}
           chartDescription={{text: ''}}
           legend={{enabled: false}}
           onSelect={this.handleSelect.bind(this)}
           onChange={(event) => console.log(event.nativeEvent)}
         />
       </View>

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

MoodChart.propTypes = {
  logValues: PropTypes.array,
  colors: PropTypes.array,
};

export default MoodChart
