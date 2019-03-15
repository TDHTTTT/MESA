"""Sends a correctly formatted request to the running flask server"""
import requests, json

recommendation_url = "http://127.0.0.1:5000/recommendation/"
weather_status_url = "http://127.0.0.1:5000/weather/"
outside_url = "http://127.0.0.1:5000/outside/"

num_resources = 3

state = {
    "sadness": 0.0,
    "lonelyness": 0.0,
    "sleepyness": 0.0,
    "anxiousness": 0.0,
    "stress": 0.0,
    "anger": 0.0
}

context = {
    "workout": 1.0,
    "mindfulness": 1.0,
    "social": 1.0
}

body = {
    "num_resources": num_resources,
    "state": state,
    "context": context
}

if __name__ == "__main__":
    r = requests.post(recommendation_url, json=body)
    print(r.status_code)
    if r.status_code is not "200":
        print(r.text)

    r = requests.get(weather_status_url)
    print(r.status_code)
    if r.status_code is not "200":
        print(r.text)

    r = requests.get(outside_url)
    print(r.status_code)
    if r.status_code is not "200":
        print(r.text)
