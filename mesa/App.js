import React from 'react';
import { StyleSheet, Text, View, Navigator } from 'react-native';
import { TaskList } from './src/task_list';

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>MESA</Text>
        <TaskList/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 4,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
