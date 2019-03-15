import React, { Component } from 'react';
import { View, ScrollView } from 'react-native';
import { CONFIG } from '../config';
import { Task } from './task';
import { personalModel } from '../personal_model/personal_model';

export class TaskList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            task1: { name: "task_1" },
            task2: { name: "task_2" },
            task3: { name: "task_3" }
        };

        personalModel.register(this);
    }

    update() {
        this.fetchDataFromServer();
    }

    fetchDataFromServer(){
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
                new_state = {
                    task1: data[0],
                    task2: data[1],
                    task3: data[2]
                }
                this.setState(new_state);
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

    componentDidMount() {
        this.fetchDataFromServer()
    }

    render() {
        return (
            <ScrollView style={{ marginBottom: 60 }} > 
                <Task name={this.state.task1.name} description={this.state.task1.description} />
                <Task name={this.state.task2.name} description={this.state.task2.description} />
                <Task name={this.state.task3.name} description={this.state.task3.description} />
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