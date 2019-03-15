import React, { Component } from 'react';
import { Text } from 'react-native';
import { activityLevel } from '../personal_model/activity_level';
import { LEVELS } from '../personal_model/levels';

export class ActivityComponent extends Component{
    constructor(props) {
        super(props)
        this.state = {
            activityLevel: LEVELS.UNKNOWN
        };

        activityLevel.updateActivityLevel()
            .then(() => {
                this.setState(
                    {activityLevel: activityLevel.getActivityLevel()}
                )})
    }

    render() {
        return (
            <Text style={this.props.style}>Your activity level is {this.state.activityLevel}. </Text>
        )
    }
}