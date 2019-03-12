import React, { Component } from 'react';
import { View, ScrollView } from 'react-native';
import { CONFIG } from './config';
import { Task } from './task';
import { personalModel } from './personal_model';

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

        body = {
            state: personalModel.getState(),
            context: personalModel.getContext(),
            num_resources: 3
        }

        const init_options = {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body)
        };

        fetch(url, init_options)
            .then((resp) => resp.json())
            .then(data => {
                console.log(data)
                this.setState(data);
            })
            .catch(error => {
                console.log("Catch: Error in fetching data from server...")
                console.log(error)
                fail_data = {
                    task1: { name: "Failure to load tasks..." },
                    task2: { name: "Failure to load tasks..." },
                    task3: { name: "Failure to load tasks..." }
                }
                this.setState(fail_data);
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