import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, ScrollView, Button, Slider } from 'react-native';
import { ActivityComponent } from './activity_component';
import Modal from "react-native-modal";

export class Greeter extends Component {
  state = {
    modalVisibilityToggle: true,
    sadnessRating: 0,
    lonelinessRating: 0,
    anxiousnessRating: 0,
    stressRating: 0,
    angerRating: 0,
  };

  toggleModalVisibility() {
    this.setState({ modalVisibilityToggle: !this.state.modalVisibilityToggle});
    
  }

  resetRatings() {
    this.state.sadnessRating = 0;
    this.state.lonelinessRating = 0;
    this.state.anxiousnessRating = 0;
    this.state.stressRating = 0;
    this.state.angerRating = 0;
  }

  submitMCQresults() {
    var mcq_answers = [this.state.sadnessRating,
    this.state.lonelinessRating, this.state.anxiousnessRating,
    this.state.stressRating, this.state.angerRating];

    console.log(mcq_answers);
    // personalModel.updateState(mcq_answers) // gets passed to personal model...
    this.resetRatings();
    console.log("MCQ results submitted.");
  }
    render() {
        return (
            <View style={styles.body}>
      				<Text style={styles.h1}>Hello, NAME!</Text>
      				<TouchableOpacity onPress={ () => { this.toggleModalVisibility()  } }>
                  <Text style={styles.pYellow}>How are you feeling?</Text>
              </TouchableOpacity>
      				<Text style={styles.p}>The weather looks WEATHER today.</Text>
              <ActivityComponent style={styles.p} />
      				<Text style={styles.p}>You have N tasks left to do today.</Text>
      				<Text style={styles.p}>There are M events coming up.</Text>
      				<Text style={[styles.p, {marginTop: "auto"}]}>TODAY : March 11, 2019</Text>
              <Modal isVisible={ this.state.modalVisibilityToggle } backdropOpacity={ 1 } backdropColor={ "#ffd200" }>
                <View style={{ flex: 1, justifyContent: "center", alignItems: "center"}}>
                  <Text>How would you rate your mood?</Text>
                  <Text>Sadness</Text>
                  <Slider
                  style={{ width: 300 }}
                  step={ 1 }
                  minimumValue={ 0 }
                  maximumValue={ 5 }
                  value={this.state.sadnessRating}
                  onValueChange={val => this.setState({ sadnessRating: val })}
                  />
                   <Text style={styles.welcome}>
                    {this.state.sadnessRating}
                  </Text> 

                  <Text>Loneliness</Text>
                  <Slider
                  style={{ width: 300 }}
                  step={ 1 }
                  minimumValue={ 0 }
                  maximumValue={ 5 }
                  value={this.state.lonelinessRating}
                  onValueChange={val => this.setState({ lonelinessRating: val })}
                  />
                   <Text style={styles.welcome}>
                    {this.state.lonelinessRating}
                  </Text>    

                  <Text>Anxiousness</Text>
                  <Slider
                  style={{ width: 300 }}
                  step={ 1 }
                  minimumValue={ 0 }
                  maximumValue={ 5 }
                  value={this.state.anxiousnessRating}
                  onValueChange={val => this.setState({ anxiousnessRating: val })}
                  />
                   <Text style={styles.welcome}>
                    {this.state.anxiousnessRating}
                  </Text>    

                  <Text>Stress</Text>
                  <Slider
                  style={{ width: 300 }}
                  step={ 1 }
                  minimumValue={ 0 }
                  maximumValue={ 5 }
                  value={this.state.stressRating}
                  onValueChange={val => this.setState({ stressRating: val })}
                  />
                   <Text style={styles.welcome}>
                    {this.state.stressRating}
                  </Text>    

                  <Text>Anger</Text>
                  <Slider
                  style={{ width: 300 }}
                  step={ 1 }
                  minimumValue={ 0 }
                  maximumValue={ 5 }
                  value={this.state.angerRating}
                  onValueChange={val => this.setState({ angerRating: val })}
                  />
                   <Text style={styles.welcome}>
                    {this.state.angerRating}
                  </Text>       

                  <Button
                  onPress={ () => { this.submitMCQresults(); this.toggleModalVisibility() } }
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
