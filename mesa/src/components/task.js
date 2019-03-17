import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity, Alert } from 'react-native';
import { Event } from './event_component';

export class Task extends Component {
    completeTask() {
        Alert.alert(
        this.props.name,
        "Did you like performing this task?",
        [
          {
            text: "Not complete",
            onPress: () => console.log('Not Complete Pressed'),
            style: 'cancel',
          },
          {
            text: 'No',
            onPress: () => this._personalModelUpdate(false),
            style: 'cancel',
          },
          {
            text: 'Yes',
            onPress: () => this._personalModelUpdate(true),
          },
        ],
        {cancelable: false},
      );
    }


    _personalModelUpdate(positiveReaction) {
      return positiveReaction; // get rid of this later.
    // <-----Temporary pseudo code----->
    // result = new dictionary
    // for every label in task.labels: // not sure how to retrieve the task's labels.
    //     if (positiveReaction == true):
    //         result[label] = 0.1; // not sure how this score will be determined.
    //     else:
    //         result[label] = -0.1;
    //personalModel.updateState(result);
    }

    viewDescription() {
      Alert.alert(
        this.props.task.name,
        this.props.task.description,
        [
          {text: 'OK', onPress: () => console.log('OK Pressed')},
        ],
        {cancelable: false},
      );
    }

    render() {
        return (
          <View>
          <View style={styles.taskitem}>
            <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
              <TouchableOpacity onPress={ () => { this.viewDescription() } }>
                <Text>{this.props.task.name}</Text>
              </TouchableOpacity>
              <Event event={this.props.task.event_data} />
            </View>

          </View>

          
            <Button onPress={() => { this.completeTask() }} title="Complete Task" color="#ffd200" accessibilityLabel="Click here to complete the task."/>
          </View>
        );
    }
}


const styles = StyleSheet.create({
  taskitem: {
    flexDirection: "row",
    paddingTop: 10,
    paddingBottom: 10,
  },

});
