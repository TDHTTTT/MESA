import React, { Component } from 'react';
import { View, ScrollView } from 'react-native';
import { CONFIG } from './config';
import { Task } from './task';


export class TaskList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            task1: { name: "task_1" },
            task2: { name: "task_2" },
            task3: { name: "task_3" }
        };
    }

    componentDidMount() {
        // Needs to be the IP of your device.
        const url = CONFIG.server_url + "/recommendation/";

        params = {
            query: [1, 0, 1, 0],
            num_resources: 3
        }

        url_w_params = url + "?" + getQueryString(params)
        console.log(url_w_params);
        const init_options = {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            }
        };

        fetch(url_w_params, init_options)
            .then((resp) => resp.json())
            .then(data => {
                // TODO actually set the right data, currently the server returns dummy data...
                console.log(data)
                test_data = {
                    task1: { name: "Workout" },
                    task2: { name: "Mindfulness" },
                    task3: { name: "Get your shit together..." }
                }
                this.setState(test_data);
            })
            .catch(error => {
                console.log(error)
                fail_data = {
                    task1: { name: "Failure to load tasks..." },
                    task2: { name: "Failure to load tasks..." },
                    task3: { name: "Failure to load tasks..." }
                }
                this.setState(test_data);
            });
    }

    render() {
        return (
            <ScrollView style={{marginBottom: 60}}> 
                <Task name={this.state.task1.name} />
                <Task name={this.state.task2.name} />
                <Task name={this.state.task3.name} />
                <Task name={this.state.task1.name} />
                <Task name={this.state.task2.name} />
                <Task name={this.state.task3.name} />
            </ScrollView>
        );
    }
}

function getQueryString(params) {
    return Object
        .keys(params)
        .map(k => {

            if (Array.isArray(params[k])) {
                return `${k}=[${params[k].toString()}]`
            }
            else {
                return `${k}=${params[k]}`
            }
        })
        .join('&')
} 