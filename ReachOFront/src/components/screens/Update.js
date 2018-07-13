import React, { Component } from 'react'
import {
  View, StyleSheet,
  Text, Image,
  TouchableOpacity,
  Vibration, TextInput } from 'react-native'
import api from '../utilities/api'
import firebase from 'react-native-firebase'
import Slider from "react-native-slider";


class Update extends Component {
  constructor(props) {
    super(props)

    this.state = {
      userId: null,
      primaryMood: 0,
      intensity: 0,
    };
  }

  updateIntensity = (number) => {
    this.setState({intesity: number});
  }

  updatePrimary = (number) => {
    this.setState({primaryMood: number});
  }

  componentDidMount() {
    const { currentUser } = firebase.auth();
    console.log("**************");
    this.setState({ ok: 'OK' });
    console.log(currentUser);
    this.setState({provider: currentUser._user.providerId,
      uid: currentUser._user.uid});

    console.log(this.state);
  }

  logStuff(info) {
    console.log("made it past update")
    console.log(info)

  }

  submit() {
    let collection = {}
    collection.intensity = this.state.intensity,
    collection.primary_mood = this.state.primaryMood,
    collection.uid = this.state.uid,
    collection.provider = this.state.provider,

    api.updateMood(collection).then(
      this.props.navigation.navigate('History')
    )
  }


  render() {

    return (
      <View style={styles.container}>
      <Text>
        Primary Feeling: {this.state.primaryMood}
      </Text>
        <Slider
          value={this.state.primaryMood}
          minimumValue={-10}
          maximumValue={10}
          step={1}
          thumbStyle={styles.thumb}
          trackStyle={styles.track}
          onValueChange={primaryMood => this.setState({ primaryMood })}
        />
        <View style={styles.container2}>
          <Text>
            Unpleasant
          </Text>
          <Text>
            Pleasant
          </Text>
        </View>

        <Text>
          Intensity: {this.state.intensity}
        </Text>
          <Slider
            value={this.state.intensity}
            minimumValue={-10}
            maximumValue={10}
            step={1}
            thumbStyle={styles.thumb}
            trackStyle={styles.track}
            onValueChange={intensity => this.setState({ intensity })}
          />
          <View style={styles.container2}>
            <Text>
              Activated
            </Text>
            <Text>
              Deactivated
            </Text>
          </View>

        <TouchableOpacity onPress={()=>this.submit()}
          style={styles.button}>
          <Text>Submit</Text>
        </TouchableOpacity>


      </View>

    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginLeft: 10,
    marginRight: 10,
    alignItems: "stretch",
    justifyContent: "center"
  },
  container2: {
    flex: 1,
    marginLeft: 10,
    marginRight: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    backgroundColor: 'skyblue',
    height: 40,
    color: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  track: {
    height: 1,
    backgroundColor: '#303030',
  },
  thumb: {
    width: 30,
    height: 30,
    backgroundColor: 'rgba(150, 150, 150, 0.3)',
    borderColor: 'rgba(150, 150, 150, 0.6)',
    borderWidth: 14,
    borderRadius: 15,
  }
})

export default Update
