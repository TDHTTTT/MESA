import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity, ScrollView } from 'react-native';
import { Event } from './event_component';
import { Icon } from 'react-native-elements';
import Modal from "react-native-modal";
import { personalModel } from '../personal_model/personal_model';

export class TaskRecords extends Component {
    constructor(props) {
        super(props);

        this.state = {
            modalVisibilityToggle: false
        }

    }
    
    toggleModalVisibility() {
        this.setState({ modalVisibilityToggle: !this.state.modalVisibilityToggle });
    }

    renderRecords()
        {
            records = [];
            personalModel.taskRecords.forEach(function(tr, i){
                var thumbs;
                var color;
                if (tr.reaction == true)
                    {
                        thumbs = "thumbs-up";
                        color = "#0064a4";
                    }
                else
                    {
                        thumbs = "thumbs-down";
                        color = "#bc0d0d";
                    }
              records.push(
                <View key={i} style={{flexDirection: 'row'}}>
                  <Text>{tr.name}</Text>
                  <Icon
                    name={thumbs}
                  type='font-awesome'
                  color={color}
                  />
                </View>);
            });
            return records;
        }
                  
                                              
    render(){
        return (
            <View>
                <TouchableOpacity onPress={() => { this.toggleModalVisibility() }}>
                    <Icon name="menu" color="#fff" />
                </TouchableOpacity>
                <Modal isVisible={this.state.modalVisibilityToggle} backdropOpacity={1} backdropColor={"#ffd200"}>
                    <View style={ { flex: 1, justifyContent: "center", alignItems: "center" } }>
                        <Text style={{fontSize: 30, fontWeight: "bold", textDecorationLine: "underline", color: "#0064a4"}} >Past Task Ratings</Text>
                        <ScrollView style={{ marginBottom: 60, alignSelf: 'stretch' }} contentContainerStyle={{ flexGrow: 1 }}> 
                            {this.renderRecords()}
                        </ScrollView>
                        <Button
                            onPress={() => { this.toggleModalVisibility() }}
                            title="Done"
                            color="#0064a4"
                            accessibilityLabel="Hide the modal."
                        />
                    </View>
                </Modal>
            </View>
        )
    }
}

const styles = StyleSheet.create({
	taskRecord: {
		fontSize: 25
	},
});
