import React, { Component } from 'react'
import {
  View, StyleSheet,
  Text, Image,
  TouchableOpacity,
  Vibration, TextInput } from 'react-native'
import api from '../utilities/api'
import firebase from 'react-native-firebase'
import Slider from "react-native-slider";

import LinearGradient from 'react-native-linear-gradient';

class Update extends Component {
  constructor(props) {
    super(props)

    this.state = {
      userId: null,
      primaryMood: 0,
      intensity: 0,
      gradient1: '#fce0c7',
      gradient2: '#fce0c7',
      moodWord: 'How do you feel?',
      primaryDisplay: 0,
      intensityDisplay: 0,
    };
  }

  updateIntensity = (number) => {
    this.setState({intensity: number});
    let absNumber = Math.abs(number);
    this.setState({intensityDisplay: absNumber})
    if (number == 0) {
      this.setState({gradient2: 'white'})
    }
    else if (number == 1 || number == 2) {
      this.setState({gradient2: '#FF7373'})
    }
    else if (number == 3 || number == 4) {
      this.setState({gradient2: '#FF4C4C'})
    }
    else if (number == 5 && number == 6) {
      this.setState({gradient2: '#FF2626'})
    }
    else if (number == 7 || number == 8) {
      this.setState({gradient2: '#D90000'})
    }
    else if (number == 9 || number == 10) {
      this.setState({gradient2: '#B20000'})
    }
    else if (number == -1 || number == -2) {
      this.setState({gradient2: '#EBF5FF'})
    }
    else if (number == -3 || number == -4) {
      this.setState({gradient2: '#C4E3FF'})
    }
    else if (number == -5 && number == -6) {
      this.setState({gradient2: '#9ED1FF'})
    }
    else if (number == -7 || number == -8) {
      this.setState({gradient2: '#78BFFF'})
    }
    else if (number == -9 || number == -10) {
      this.setState({gradient2: '#4593D9'})
    }

    this.updateMoodWord()

  }

  updatePrimary = (number) => {
    this.setState({primaryMood: number});
    let absNumber = Math.abs(number);
    this.setState({primaryDisplay: absNumber})
    if (number == 0) {
      this.setState({gradient1: 'white'})
    }
    else if (number == -1 || number == -2) {
      this.setState({gradient1: '#E7FFE7'})
    }
    else if (number == -3 || number == -4) {
      this.setState({gradient1: '#C1FFC1'})
    }
    else if (number == -5 && number == -6) {
      this.setState({gradient1: '#90EE90'})
    }
    else if (number == -7 || number == -8) {
      this.setState({gradient1: '#5BC85B'})
    }
    else if (number == -9 || number == -10) {
      this.setState({gradient1: '#31A231'})
    }
    else if (number == 1 || number == 2) {
      this.setState({gradient1: '#FFFFB2'})
    }
    else if (number == 3 || number == 4) {
      this.setState({gradient1: '#FFFF99'})
    }
    else if (number == 5 && number == 6) {
      this.setState({gradient1: '#FFFF8C'})
    }
    else if (number == 7 || number == 8) {
      this.setState({gradient1: '#FFFF66'})
    }
    else if (number == 9 || number == 10) {
      this.setState({gradient1: '#FFFF00'})
    }

    this.updateMoodWord()
  }

  updateMoodWord() {
    // Q1
    if (this.state.intensity > -1 &&
      this.state.primaryMood > 0 &&
      this.state.primaryMood < 4) {
      this.setState({moodWord: 'Alert'})
    }
    else if (this.state.intensity > -1 &&
      this.state.primaryMood > 3 &&
      this.state.primaryMood < 6) {
      this.setState({moodWord: 'Excited'})
      }
    else if (this.state.intensity > -1 &&
      this.state.primaryMood > 5 &&
      this.state.primaryMood < 9) {
      this.setState({moodWord: 'Happy'})
    }
    else if (this.state.intensity > -1 &&
      this.state.primaryMood > 8 &&
      this.state.primaryMood < 11) {
      this.setState({moodWord: 'Elated'})
    }
    // Q2
    if (this.state.intensity < 0 &&
      this.state.primaryMood > 0 &&
      this.state.primaryMood < 4) {
      this.setState({moodWord: 'Calm'})
    }
    else if (this.state.intensity < 0 &&
      this.state.primaryMood > 3 &&
      this.state.primaryMood < 6) {
      this.setState({moodWord: 'Relaxed'})
      }
    else if (this.state.intensity < 0 &&
      this.state.primaryMood > 5 &&
      this.state.primaryMood < 9) {
      this.setState({moodWord: 'Serene'})
    }
    else if (this.state.intensity < 0 &&
      this.state.primaryMood > 9 &&
      this.state.primaryMood < 11) {
      this.setState({moodWord: 'Contented'})
    }
    // Q3
    if (this.state.intensity < 0 &&
      this.state.primaryMood < 0 &&
      this.state.primaryMood > -4) {
      this.setState({moodWord: 'Fatigued'})
    }
    else if (this.state.intensity < 0 &&
      this.state.primaryMood < -3 &&
      this.state.primaryMood > -6) {
      this.setState({moodWord: 'Bored'})
      }
    else if (this.state.intensity < 0 &&
      this.state.primaryMood < -5 &&
      this.state.primaryMood > -9) {
      this.setState({moodWord: 'Depressed'})
    }
    else if (this.state.intensity < 0 &&
      this.state.primaryMood < -8 &&
      this.state.primaryMood > -11) {
      this.setState({moodWord: 'Sad'})
    }
    // Q4
    if (this.state.intensity > -1 &&
      this.state.primaryMood < 0 &&
      this.state.primaryMood > -4) {
      this.setState({moodWord: 'Tense'})
    }
    else if (this.state.intensity > -1 &&
      this.state.primaryMood < -3 &&
      this.state.primaryMood > -6) {
      this.setState({moodWord: 'Nervous'})
      }
    else if (this.state.intensity > -1 &&
      this.state.primaryMood < -5 &&
      this.state.primaryMood > -9) {
      this.setState({moodWord: 'Stressed'})
    }
    else if (this.state.intensity > -1 &&
      this.state.primaryMood < -8 &&
      this.state.primaryMood > -11) {
      this.setState({moodWord: 'Upset'})
    }
  }

  componentDidMount() {
    const { currentUser } = firebase.auth();
    this.setState({provider: currentUser._user.providerId,
      uid: currentUser._user.uid});
  }

  submit() {
    let collection = {}
    collection.intensity = this.state.intensity,
    collection.primary_mood = this.state.primaryMood,
    collection.uid = this.state.uid,
    collection.provider = this.state.provider,

    api.updateMood(collection).then(
      this.setState({  primaryMood: 0,
        intensity: 0,
        gradient1: '#fce0c7',
        gradient2: '#fce0c7',
        moodWord: 'How do you feel?',
        primaryDisplay: 0,
        intensityDisplay: 0}),
      this.props.navigation.navigate('History')
    )


  }


  render() {

    return (
      <LinearGradient colors={[this.state.gradient1, this.state.gradient2]} style={styles.linearGradient}>

        <View style={styles.container1}>
        <Text style={styles.moodMeasure}>
          Primary Feeling: {this.state.primaryDisplay}
        </Text>
          <Slider
            value={this.state.primaryMood}
            minimumValue={-10}
            maximumValue={10}
            step={1}
            thumbStyle={styles.thumb}
            trackStyle={styles.track}
            onValueChange={primaryMood => this.updatePrimary( primaryMood )}
          />
          <View style={styles.container2}>
            <Text>
              Unpleasant
            </Text>
            <Text>
              Pleasant
            </Text>
          </View>

          <View style={styles.container3}>
            <Text style={styles.moodWord}>{this.state.moodWord}</Text>
          </View>

          <Text style={styles.moodMeasure}>
            Intensity: {this.state.intensityDisplay}
          </Text>
            <Slider
              value={this.state.intensity}
              minimumValue={-10}
              maximumValue={10}
              step={1}
              thumbStyle={styles.thumb}
              trackStyle={styles.track}
              onValueChange={intensity => this.updateIntensity( intensity )}
            />
            <View style={styles.container2}>
              <Text>
                Dectivated
              </Text>
              <Text>
                Activated
              </Text>
            </View>

          <TouchableOpacity onPress={()=>this.submit()}
            style={styles.button}>
            <Text style={{color:'white'}}>Submit</Text>
          </TouchableOpacity>


        </View>
      </LinearGradient>
    )
  }
}

const styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
  },
  container1: {
    flex: 1,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 50,
    marginBottom: 50,
    alignItems: "stretch",
    justifyContent: "space-around"
  },
  container2: {
    flex: 1,
    marginLeft: 10,
    marginRight: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  container3: {
    flex: 1,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  moodWord: {
    fontSize: 32,
    fontWeight: '500',
  },
  moodMeasure: {
    textAlign: 'center',
    fontSize: 18,
  },
  button: {
    backgroundColor: '#4a4a4a',
    height: 40,
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
