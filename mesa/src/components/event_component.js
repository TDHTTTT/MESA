import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity, Alert } from 'react-native';

export class Event extends Component {

    constructor(props){
        super(props);
    }

    viewDescription() {
        let name = this.props.event[0].name
        let time = this.props.event[0].time;
        let location = this.props.event[0].location;
        let description = `Time: ${time} Location: ${location}`;
        let title = `Event: ${name}`;
        Alert.alert(
            title,
            description,
            [
                { text: 'OK', onPress: () => console.log('OK Pressed') },
            ],
            { cancelable: false },
        );
    }

    render() {
        if (this.props.event.length == 0) {
            return null;
        }
        else {
            return (
                <TouchableOpacity onPress={() => { this.viewDescription() }}>
                    <Text> Related Upcoming Event: {this.props.event[0].name} </Text>
                </TouchableOpacity>
            );
        }
    }
}


const styles = StyleSheet.create({
    taskitem: {
        flexDirection: "row",
        paddingTop: 10,
        paddingBottom: 10,
    },
});
