import { weatherState } from "./weather";
import { activityLevel } from "./activity_level";
import { timeTState } from "./time_of_day"
import { LEVELS, STATE, TSTATE } from "./levels";
import _ from 'lodash'
import pm from '../data/personal-model.json'

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
            workout: 0.5,
            mindfulness: 0.5,
            social: 0.5
        };
        
        this.activity = LEVELS.UNKNOWN;
        this.weather = STATE.UNKNOWN;
        this.time_of_day = TSTATE.UNKNOWN;
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
        var _this = this;
        // Calls __calculateContext after time of day, activity and weather has been collected.
        // If all 3 things can be retrived or will wait forever
        var finished = _.after(3, _this.__calculateContext.bind(_this));

        timeTState.updateTimeTState().then(() => {
            _this.time_of_day = timeTState.getTimeTState();
            finished();
        });

        activityLevel.updateActivityLevel().then(() => {
            _this.activity = activityLevel.getActivityLevel();
            finished();
        }); 

        weatherState.updateWeatherState().then(() => {
            _this.weather = weatherState.getState();
            finished();
        })
    }

    __calculateContext() {
        console.log("Current activity value: " + this.activity);
        console.log("Current weather value: " + this.weather);
        console.log("Current time of day: " + this.time_of_day);
        // Get previous recommendations and how the user felt about them.
        // loop over previous responses (~personal model)
    
        for (var i=0; i<pm.length; i++) {
            curr = pm[i];
            if ((this.weather == "NA" || curr["weather"].toLowerCase() == this.weather) && 
                (this.time_of_day == "NA" || curr["time_of_day"].toLowerCase() == this.time_of_day) &&
                (this.activity == "NA" || curr["activity"].toLowerCase() == this.activity)) {
                if (curr["preference"] == "Yes") {
                    for (var j=0; j<curr["labels"].length; j++) {
                        curr_label = curr["labels"][j];
                        this.context[curr_label] = Math.sqrt(this.context[curr_label]);
                    }
                }
                else {
                    for (var j=0; j<curr["labels"].length; j++) {
                        curr_label = curr["labels"][j];
                        this.context[curr_label] = (this.context[curr_label])/1.2;
                    }
                }
        }
    }
        console.log("Final workout:" + this.context["workout"]);
        console.log("Final mindfulness:" + this.context["mindfulness"]);
        console.log("Final social:" + this.context["social"]);
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