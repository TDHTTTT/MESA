import { TSTATE } from './levels';

class TimeTState {
    constructor() {
        this.timeTState = TSTATE.UNKNOWN;
    }

    async updateTimeTState() {
        let date = new Date();
        let time_of_day = date.getHours();
        console.log("Now is around " + time_of_day + " o'clock");

        if (time_of_day > 18) {
            console.log("Time of day is set too: " + TSTATE.NIGHT);
            this.timeTState = TSTATE.NIGHT;
        }
        else if (time_of_day > 12) {
            console.log("Time of day is set too: " + TSTATE.AFTERNOON);
            this.timeTState = TSTATE.AFTERNOON;
        }
        else {
            console.log("timeTState is set too: " + TSTATE.MORNING);
            this.timeTState = TSTATE.MORNING;
        }
    }

    getTimeTState() {
        return this.timeTState;
    }
}

export let timeTState = new TimeTState();