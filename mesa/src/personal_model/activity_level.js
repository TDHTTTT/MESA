import { LEVELS } from './levels';
import { Pedometer } from 'expo';

class ActivityLevel {
    constructor() {
        this.activityLevel = LEVELS.UNKNOWN;

        if (Pedometer.isAvailableAsync()) {
            console.log("Pedometer is available!!");
            this.updateActivityLevel();
        }
        else {
            console.log("Pedometer is not available...");
        }

        this.updateActivityLevel()
    }

    async updateActivityLevel() {
        const end = new Date();
        const start = new Date()
        start.setDate(end.getDate() - 1)

        let result = await Pedometer.getStepCountAsync(start, end);

        let step_count = result.steps;
        console.log("Step count over the last 24 hours is: " + step_count);

        if (step_count > 8000) {
            console.log("ActivityLevel is set too: " + LEVELS.HIGH);
            this.activityLevel = LEVELS.HIGH;
        }
        else if (step_count > 4000) {
            console.log("ActivityLevel is set too: " + LEVELS.MEDIUM);
            this.activityLevel = LEVELS.MEDIUM;
        }
        else {
            console.log("ActivityLevel is set too: " + LEVELS.LOW);
            this.activityLevel = LEVELS.LOW;
        }
    }

    getActivityLevel() {
        return this.activityLevel;
    }
}

export let activityLevel = new ActivityLevel();