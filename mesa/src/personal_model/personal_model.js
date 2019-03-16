import { weatherState } from "./weather";
import { activityLevel } from "./activity_level";
import { timeTState } from "./time_of_day"
import { LEVELS, STATE, TSTATE } from "./levels";
import _ from 'lodash'

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
        var finished = _.after(2, _this.__calculateContext.bind(_this));

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
        console.log("Activity value: " + this.activity);
        console.log("Weather value: " + this.weather);
        console.log("Time of day: " + this.time_of_day);

        // Get previous recommendations and how the user felt about them.


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