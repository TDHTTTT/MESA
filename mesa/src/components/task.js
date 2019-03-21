import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity, Alert } from 'react-native';
import { Event } from './event_component';
import { personalModel } from '../personal_model/personal_model';

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
            onPress: () => this._recordTask(false),
            style: 'cancel',
          },
          {
            text: 'Yes',
            onPress: () => this._recordTask(true),
          },
        ],
        {cancelable: false},
      );
    }


    _recordTask(reaction) {
        personalModel.updateTaskRecords(this.props.task.name, reaction);
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
