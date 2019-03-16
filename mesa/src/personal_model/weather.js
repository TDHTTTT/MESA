import { STATE } from './levels';
import { CONFIG } from '../config';

class WeatherState {
    constructor() {
        this.weatherState = STATE.UNKNOWN;
    }

    async updateWeatherState() {
        // Needs to be the IP of your device.
        const url = CONFIG.server_url + "/outside/";

        const init_options = {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
        };

        // This is really hacky, but it works.
        await fetch(url, init_options)
            .then(response => {
                let goodWeather = response["_bodyText"];
                if (goodWeather.indexOf("True") !== -1) {
                    this.weatherState = STATE.GOOD;
                }
                else {
                    this.weatherState = STATE.BAD;
                }
            })
            .catch(error => {
                console.log("Catch: Error in fetching data from server...")
            });
    }

    getState() {
        return this.weatherState;
    }
}


export let weatherState = new WeatherState();