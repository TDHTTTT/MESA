import React, { Component } from 'react';
import Modal from "react-native-modal";
import { personalModel } from './personal_model';
import { Text, View, Button, Slider } from 'react-native';


export class MoodSurvey extends Component {
    constructor(props){
        super(props);

        this.state = {
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

    resetRatings() {
        this.state.sadnessRating = 0;
        this.state.lonelinessRating = 0;
        this.state.anxiousnessRating = 0;
        this.state.stressRating = 0;
        this.state.angerRating = 0;
        this.state.sleepynessRating = 0;
    }

    submitMCQresults() {
        // var mcq_answers = [this.state.sadnessRating,
        // this.state.lonelinessRating, this.state.anxiousnessRating,
        // this.state.stressRating, this.state.angerRating];

        personalModel.updatePersonalModel(this.state) // gets passed to personal model...
        this.resetRatings();
        console.log("MCQ results submitted.");
    }


    render() {
        return (
            <Modal isVisible={this.state.modalVisibilityToggle} backdropOpacity={1} backdropColor={"#ffd200"}>
                <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                    <Text>How would you rate your mood?</Text>
                    <Text>Sadness</Text>
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

                    <Text>Loneliness</Text>
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

                    <Text>Anxiousness</Text>
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

                    <Text>Stress</Text>
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

                    <Text>Anger</Text>
                    <Slider
                        style={{ width: 300 }}
                        step={1}
                        minimumValue={0}
                        maximumValue={5}
                        value={this.state.angerRating}
                        onValueChange={val => this.setState({ angerRating: val })}
                    />
                    <Text>Sleepyness</Text>
                    <Slider
                        style={{ width: 300 }}
                        step={1}
                        minimumValue={0}
                        maximumValue={5}
                        value={this.state.sleepynessRating}
                        onValueChange={val => this.setState({ sleepynessRating: val })}
                    />
                    <Text style={this.props.style}>
                        {this.state.angerRating}
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
