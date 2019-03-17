import React, { Component } from 'react';
import { Text } from 'react-native';
import { weatherState } from '../personal_model/weather';
import { STATE } from '../personal_model/levels';

export class Weather extends Component{
    constructor(props) {
        super(props)
        this.state = {
            weather: STATE.UNKNOWN
        };

        weatherState.updateWeatherState()
            .then(() => {
                this.setState(
                    { weather: weatherState.getState()}
                )})
    }

    render() {
        return (
            <Text style={this.props.style}>The weather looks {this.state.weather} today.</Text>
        )
    }
}