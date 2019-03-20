import React, { Component } from 'react';
import Modal from "react-native-modal";
import { personalModel } from '../personal_model/personal_model';
import { Text, View, Button, Slider } from 'react-native';


export class MoodSurvey extends Component {
    constructor(props){
        super(props);

        this.state = {
        	recordOfMentalStates: [],
            modalVisibilityToggle: true,
            sadnessRating: 0,
            lonelinessRating: 0,
            anxiousnessRating: 0,
            stressRating: 0,
            angerRating: 0,
            sleepynessRating:0
        };
    }

    toggleModalVisibility() {
        this.setState({ modalVisibilityToggle: !this.state.modalVisibilityToggle });
    }

    resetMentalState() {
        this.state.sadnessRating = 0;
        this.state.lonelinessRating = 0;
        this.state.anxiousnessRating = 0;
        this.state.stressRating = 0;
        this.state.angerRating = 0;
        this.state.sleepynessRating = 0;
    }

    submitMCQresults() {
        this.recordMentalState(this.state);
        this.weighMentalState();
        personalModel.updatePersonalModel(this.state);
        this.resetMentalState();
        console.log("MCQ results submitted.");
    }

    weighMentalState() {
        var mentalStatesCount = this.state.recordOfMentalStates.length;
        if (mentalStatesCount == 0)
            {
                return null;
            }
        var weightedSadnessRating = 0;
        var weightedLonelinessRating = 0;
        var weightedAnxiousnessRating = 0;
        var weightedStressRating = 0;
        var weightedAngerRating = 0;
        var weightedSleepynessRating = 0;
        var weight = 50;
        var totalWeight = 0;
        for (var i = 0; i < mentalStatesCount; i++)
            {
                weightedSadnessRating += this.state.recordOfMentalStates[i][0] * weight;
                weightedLonelinessRating += this.state.recordOfMentalStates[i][1] * weight;
                weightedAnxiousnessRating += this.state.recordOfMentalStates[i][2] * weight;
                weightedStressRating += this.state.recordOfMentalStates[i][3] * weight;
                weightedAngerRating += this.state.recordOfMentalStates[i][4] * weight;
                weightedSleepynessRating += this.state.recordOfMentalStates[i][5] * weight;
                totalWeight += weight;
                weight -= 5;
            }
        
        this.state.sadnessRating = Math.round(weightedSadnessRating / totalWeight); // Round it...
        this.state.lonelinessRating = Math.round(weightedLonelinessRating / totalWeight); // Round it...
        this.state.anxiousnessRating = Math.round(weightedAnxiousnessRating / totalWeight); // Round it...
        this.state.stressRating = Math.round(weightedStressRating / totalWeight); // Round it...
        this.state.angerRating = Math.round(weightedAngerRating / totalWeight); // Round it...
        this.state.sleepynessRating = Math.round(weightedSleepynessRating / totalWeight); // Round it...
        var temp = [this.state.sadnessRating, this.state.lonelinessRating, this.state.anxiousnessRating, this.state.stressRating, this.state.angerRating, this.state.sleepynessRating];
        console.log("Ratings weighted...");
        console.log(temp);
    }
    recordMentalState(mentalState) {
    	var temp = [mentalState.sadnessRating, mentalState.lonelinessRating, mentalState.anxiousnessRating, mentalState.stressRating, mentalState.angerRating, mentalState.sleepynessRating];
        if (this.state.recordOfMentalStates.length > 4) // Only hold on to the top 5...
            {
                this.state.recordOfMentalStates.shift(); // Remove the oldest mental state.
            }
        
    	this.state.recordOfMentalStates.push(temp);
    	console.log(this.state.recordOfMentalStates);
    	console.log("Current mental state recorded.");
    }

    render() {
        return (
            <Modal isVisible={this.state.modalVisibilityToggle} backdropOpacity={1} backdropColor={"#ffd200"}>
                <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                    <Text>How would you rate your mood?</Text>
                    <Text>Sad</Text>
                    <Slider
                        style={{ width: 300 }}
                        step={1}
                        minimumValue={0}
                        maximumValue={5}
                        value={this.state.sadnessRating}
                        onValueChange={val => this.setState({ sadnessRating: val })}
                    />
                    <Text style={this.props.style}>
                        {this.state.sadnessRating}
                    </Text>

                    <Text>Lonely</Text>
                    <Slider
                        style={{ width: 300 }}
                        step={1}
                        minimumValue={0}
                        maximumValue={5}
                        value={this.state.lonelinessRating}
                        onValueChange={val => this.setState({ lonelinessRating: val })}
                    />
                    <Text style={this.props.style}>
                        {this.state.lonelinessRating}
                    </Text>

                    <Text>Anxious</Text>
                    <Slider
                        style={{ width: 300 }}
                        step={1}
                        minimumValue={0}
                        maximumValue={5}
                        value={this.state.anxiousnessRating}
                        onValueChange={val => this.setState({ anxiousnessRating: val })}
                    />
                    <Text style={this.props.style}>
                        {this.state.anxiousnessRating}
                    </Text>

                    <Text>Stressed</Text>
                    <Slider
                        style={{ width: 300 }}
                        step={1}
                        minimumValue={0}
                        maximumValue={5}
                        value={this.state.stressRating}
                        onValueChange={val => this.setState({ stressRating: val })}
                    />
                    <Text style={this.props.style}>
                        {this.state.stressRating}
                    </Text>

                    <Text>Angry</Text>
                    <Slider
                        style={{ width: 300 }}
                        step={1}
                        minimumValue={0}
                        maximumValue={5}
                        value={this.state.angerRating}
                        onValueChange={val => this.setState({ angerRating: val })}
                    />
                    <Text style={this.props.style}>
                        {this.state.angerRating}
                    </Text>
             
                    <Text>Sleepy</Text>
                    <Slider
                        style={{ width: 300 }}
                        step={1}
                        minimumValue={0}
                        maximumValue={5}
                        value={this.state.sleepynessRating}
                        onValueChange={val => this.setState({ sleepynessRating: val })}
                    />
                    <Text style={this.props.style}>
                        {this.state.sleepynessRating}
                    </Text>

                    <Button
                        onPress={() => { this.submitMCQresults(); this.toggleModalVisibility() }}
                        title="Submit"
                        color="#0064a4"
                        accessibilityLabel="Hide the modal."
                    />
                    </View>
            </Modal>
        )
    }
}

export const toggleModalVisibility = () => {
    toggleModalVisibility();
}