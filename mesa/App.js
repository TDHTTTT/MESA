import React from 'react';
import { StyleSheet, Text, View, Navigator } from 'react-native';
import { Header, Card } from 'react-native-elements'
import { TaskList } from './src/task_list';

// const list = [
//   {
//     title: 'Take a walk for 15 minutes.',
//     icon: 'av-timer'
//   },
//   {
//     title: 'Meditate for 20 minutes.',
//     icon: 'flight-takeoff'
//   },
// ]

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Header
		leftComponent={{ icon: 'menu', color: '#fff' }}
		centerComponent={{ text: 'MESA', style: { color: '#fff' } }}
		rightComponent={{ icon: 'home', color: '#fff' }}
		containerStyle={{
			backgroundColor: "transparent",
		}}
		/>
		<View style={styles.body}>
			<Text style={styles.h1}>Hello, NAME!</Text>
			<Text style={styles.p}>How are you feeling?</Text>
			<Text style={styles.p}>The weather looks WEATHER today.</Text>
			<Text style={styles.p}>You have N tasks left to do today.</Text>
			<Text style={styles.p}>There are M events coming up.</Text>
			<Text style={[styles.p, {marginTop: "auto"}]}>TODAY : March 11, 2019</Text>
		</View>
        <Card title="n Tasks" containerStyle={{
			flex: 0.5,
			marginBottom: 60,
		}}>
		{
			<TaskList/>
		}
		</Card>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0064a4",
  },

  h1: {
  	fontSize: 30,
  	color: "white",
  },

  p: {
  	fontSize: 15,
  	color: "white",
  },

  body: {
  	flex: 0.5,
  	marginLeft: 20,
  	marginRight: 20,
  },

});
