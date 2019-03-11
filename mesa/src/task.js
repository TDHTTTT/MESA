import React, {Component} from 'react';
import {Text, View} from 'react-native';


export class Task extends Component {
    render() {
        return (
            <View style={{ alignItems: 'center' }}>
                <Text>Task: {this.props.name}</Text>
            </View>
        );
    }
}
