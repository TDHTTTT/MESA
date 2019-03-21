import React from 'react';
import { StyleSheet, Text, View, Navigator } from 'react-native';
import { Header, Card } from 'react-native-elements';
import { TaskList } from './src/components/task_list';
import { Greeter } from './src/components/greeter';
import { TaskRecords } from "./src/components/task_records";

export default class App extends React.Component {
	render() {
		return (
			<View style={styles.container}>
				<Header
					leftComponent={ <TaskRecords />}
					centerComponent={{ text: 'MESA', style: { color: '#fff' } }}
					rightComponent={{ icon: 'home', color: '#fff' }}
					containerStyle={{
					backgroundColor: "transparent",
				}}/>

				<Greeter/>
				
				<Card title="Tasks" containerStyle={{
					flex: 0.7,
					marginBottom: 30,
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
});