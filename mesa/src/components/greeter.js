import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ActivityComponent } from './activity_component';
import { MoodSurvey } from './mood_survey';
import { Weather } from './weather_component';
export class Greeter extends Component {

  render() {
    return (
      <View style={styles.body}>
        <Text style={styles.h1}>Hello, Anteater!</Text>
        <Text style={styles.pYellow}>How are you feeling?</Text>
        <Weather style={styles.p} />
        <ActivityComponent style={styles.p} />
        {/* <Text style={styles.p}>You have N tasks left to do today.</Text> */}
        {/* <Text style={styles.p}>There are M events coming up.</Text> */}
        <Text style={[styles.p, {marginTop: "auto"}]}>TODAY : {new Date().toDateString()}</Text>
        <MoodSurvey style={styles.welcome}/>
        </View>
      );
  }
}


const styles = StyleSheet.create({

  h1: {
  	fontSize: 30,
  	color: "white",
  },

  p: {
  	fontSize: 15,
  	color: "white",
  },

  pYellow: {
  	fontSize: 15,
  	color: "#ffd200",
  },

  body: {
  	flex: 0.3,
  	marginLeft: 20,
  	marginRight: 20,
  },

});
