import { activityLevel } from './activity_level';
import { ComponentEventsObserver } from 'react-native-navigation/lib/dist/events/ComponentEventsObserver';

class PersonalModel {
    constructor(){
        this.state = {
            sadness: 0.0,
            lonelyness: 0.0,
            sleepyness: 0.0,
            anxiousness: 0.0,
            stress: 0.0,
            anger: 0.0
        };
        
        this.context = {
            workout: 1.0,
            mindfulness: 1.0,
            social: 1.0
        };

        this.dependencies = []
    }

    __updateState(mc_answers) {
        // Here we update the state
        this.state = {
            sadness: mc_answers.sadnessRating,
            lonelyness: mc_answers.lonelinessRating,
            sleepyness: mc_answers.sleepynessRating,
            anxiousness: mc_answers.anxiousnessRating,
            stress: mc_answers.stressRating,
            anger: mc_answers.angerRating
        }
    }

    __updateContext(){
        // Here we update the context
        // What are the inputs?
        // How do we calculate the context?
        // Get act activity level of user.

        // activityLevel.updateActivityLevel().then(
        //     () => {
        //         let activity = activityLevel.getActivityLevel();
        //         console.log("Personal Model: Activity level of the user is: " + activity);
        //     });
    }

    updatePersonalModel(mc_answers) {
        this.__updateState(mc_answers);
        this.__updateContext();


        this.dependencies.forEach(dep => {
            dep.update()
        })
    }

    getState() {
        return this.state;
    }

    getContext() {
        return this.context;
    }

    register(dependency) {
        this.dependencies.push(dependency)
    }
}

export let personalModel = new PersonalModel();