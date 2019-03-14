import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity, Modal, Alert } from 'react-native';
import { personalModel } from './personal_model';

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
        this.props.name,
        "task.description", // same issue as above. How to get a task's description?
        [
          {
            text: 'Cancel',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          },
          {text: 'OK', onPress: () => console.log('OK Pressed')},
        ],
        {cancelable: false},
      );
    }

    render() {
        return (
          <View style={styles.taskitem}>
            <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
              <TouchableOpacity onPress={ () => { this.viewDescription() } }>
                <Text>Task: {this.props.name}</Text>
              </TouchableOpacity>
            </View>
            <View style={{flex: 1}}>
              <Button
                  onPress={ () => { this.completeTask() } }
                  title="Complete Task"
                  color="#ffd200"
                  accessibilityLabel="Click here to complete the task."
                />
            </View>
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
