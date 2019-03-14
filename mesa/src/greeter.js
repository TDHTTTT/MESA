import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, ScrollView, Button } from 'react-native';
import { personalModel } from './personal_model';
import Modal from "react-native-modal";

export class Greeter extends Component {
  state = {
    modalVisibilityToggle: true,
  };

  toggleModalVisibility() {
    this.setState({ modalVisibilityToggle: !this.state.modalVisibilityToggle});
    // mcq_answers = array
    // From 0 to 5 how do you rate your...
    // mcq_answers.append(sadnessRating)
    // mcq_answers.append(lonelinessRating)
    // mcq_answers.append(anxiousnessRating)
    // mcq_answers.append(stressRating)
    // mcq_answers.append(angerRating)
    // personalModel.updateState(mcq_answers) // gets passed to personal model...
  }

    render() {
        return (
            <View style={styles.body}>
      				<Text style={styles.h1}>Hello, NAME!</Text>
      				<TouchableOpacity onPress={ () => { this.toggleModalVisibility()  } }>
                  <Text style={styles.pYellow}>How are you feeling?</Text>
              </TouchableOpacity>
      				<Text style={styles.p}>The weather looks WEATHER today.</Text>
      				<Text style={styles.p}>You have N tasks left to do today.</Text>
      				<Text style={styles.p}>There are M events coming up.</Text>
      				<Text style={[styles.p, {marginTop: "auto"}]}>TODAY : March 11, 2019</Text>
              <Modal isVisible={ this.state.modalVisibilityToggle } backdropOpacity={ 1 } backdropColor={ "#ffd200" }>
                <View style={{ flex: 1, justifyContent: "center", alignItems: "center"}}>
                  <Text>From 0 to 5, how would you rate your mood?</Text>
                  <Button
                  onPress={ () => { this.toggleModalVisibility() } }
                  title="Hide Modal"
                  color="#0064a4"
                  accessibilityLabel="Hide the modal."
                />
                </View>
              </Modal>
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
