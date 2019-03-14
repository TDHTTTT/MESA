import { activityLevel } from './activity_level';

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
    }

    updateState(mc_answers) {
        // Here we update the state
        // process mc_answers

    }

    updateContext() {
        // Here we update the context
        // What are the inputs?
        // How do we calculate the context?

        // Get act activity level of user.
        activityLevel.updateActivityLevel().then(
            () => {
                let activity = activityLevel.getActivityLevel();
                console.log("Personal Model: Activity level of the user is: " + activity);
            });
        
    }

    getState() {
        return this.state;
    }

    getContext() {
        return this.context;
    }
}

export let personalModel = new PersonalModel();