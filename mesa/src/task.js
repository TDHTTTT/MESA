import React, { Component } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';


export class Task extends Component {
    render() { // TODO make the task clickable.
        return (
            <View style={styles.taskitem}>
                <Text>Task: {this.props.name}</Text>
                <Button
				  onPress={emptyFunction}
				  title="DONE"
				  color="#ffd200"
				  accessibilityLabel="Click here to complete the task."
				/>
            </View>
        );
    }
}

function emptyFunction() {
    return
} 


const styles = StyleSheet.create({
  taskitem: {
  },

});
