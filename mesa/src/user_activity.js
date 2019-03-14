
import { Pedometer } from 'expo';
import React, { Component } from 'react';
import { Text } from 'react-native';

const LEVELS = {
    UNKNOWN: "NA",
    LOW: "low",
    MEDIUM: "medium",
    HIGH: "good"
}

export class ActivityLevel extends Component{
    constructor(props) {
        super(props)
        this.state = {
            activityLevel: LEVELS.UNKNOWN
        };

        if ( Pedometer.isAvailableAsync() ) {
            console.log("Pedometer is available!!");
            this.updateActivityLevel();
        }
        else {
            console.log("Pedometer is not available...");
        }
    }

    async updateActivityLevel() {
        const end = new Date();
        const start = new Date()
        start.setDate(end.getDate() - 1)

        let result = await Pedometer.getStepCountAsync(start, end);

        let step_count = result.steps;
        console.log("Step count over the last 24 hours is: " + step_count);

        if (step_count > 8000) {
            console.log("ActivityLevel is set too: " + LEVELS.HIGH);
            this.setState({activityLevel: LEVELS.HIGH});
        }
        else if (step_count > 4000){
            console.log("ActivityLevel is set too: " + LEVELS.MEDIUM);
            this.setState({ activityLevel: LEVELS.MEDIUM });
        }
        else {
            console.log("ActivityLevel is set too: " + LEVELS.LOW);
            this.setState({ activityLevel: LEVELS.LOW });
        }
    }

    getActivityLevel() {
        return this.activityLevel;
    }

    render() {
        return (
            <Text style={this.props.style}>Your activity level is {this.state.activityLevel}. </Text>
        )
    }
}