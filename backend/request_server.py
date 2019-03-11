"""Sends a correctly formatted request to the running flask server"""
import requests, json

url = "http://127.0.0.1:5000/recommendation/"
incorrect_query="query=[1, 0, 1, 0]&num_resources=3"
query="state=[1, 0, 1, 4]&context=[3, 4, 5]&num_resources=3"

if __name__ == "__main__":
    r = requests.get(url, incorrect_query)
    if r.status_code != 400:
        raise Exception("Query was sent with incorrect arguments and did not error")
    else:
        print("Incorrect query errored as expected: {}".format(r.json()))

    r = requests.get(url, query)
    if r.status_code != 200:
        raise Exception("Correct query errored: {}".format(r.json()))
    else:
        print("Correct query response received: {}".format(r.json()))
