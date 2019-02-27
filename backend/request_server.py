import requests, json

url = "http://127.0.0.1:5000/recommendation/"
query="query=[1, 0, 1, 0]&num_resources=3"
r = requests.get(url, query)

print(r.json())
