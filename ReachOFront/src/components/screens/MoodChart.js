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


class MoodChart extends React.Component {
  static navigationOptions = {
      header: null
   }

  constructor(props) {
   super(props);

   this.state = {
     selectedEntry: "none selected",
     selectedDate: "none selected",
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


 handleSelect(event) {
   let entry = event.nativeEvent
   let labelIndex = this.props.labels[event.nativeEvent.x]
   let dateIndex = this.props.date[event.nativeEvent.x]

   if (entry == null) {
     this.setState({...this.state, selectedEntry: null})
   } else {
     this.setState({...this.state, selectedEntry: labelIndex, selectedDate: dateIndex})
   }
 }

 render() {

   return (

     <View style={styles.container}>

       <View style={styles.selectedContainer}>
        <Text style={{ fontSize: 22, fontWeight: '400', marginTop: 60}}>Date: {this.state.selectedDate}</Text>
         <Text style={{ fontSize: 22, fontWeight: '400', paddingBottom: 30,}}>Mood: {this.state.selectedEntry}</Text>
       </View>

       <View style={styles.container}>
         <BarChart
           style={styles.chart}
           data={this.state.data}
           xAxis={this.state.xAxis}
           yAxis={this.state.yAxis}
           chartDescription={{text: ''}}
           legend={{enabled: false }}
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
   backgroundColor: '#fce0c7',
   flex: 1,
   justifyContent: 'center',
 },
 chart: {
   flex: 1
 },
 selectedContainer: {
   height: 130,
   backgroundColor: '#fce0c7',
   justifyContent: 'center',
   alignItems: 'center',
   paddingBottom: 0,
 }
});

MoodChart.propTypes = {
  logValues: PropTypes.array,
  colors: PropTypes.array,
  labels: PropTypes.array,
  date: PropTypes.array
};

export default MoodChart
