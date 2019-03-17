import React, { Component } from 'react';
import { StyleSheet, Text } from 'react-native';

export class Event extends Component {

    constructor(props){
        super(props);
        console.log(this.props);
    }

    render() {
        if (this.props.event.length == 0) {
            return null;
        }
        else {
            console.log("Event data:")
            console.log(this.props.event)
            return (
                <Text> Related Upcoming Event: {this.props.event[0][2]} </Text>
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
