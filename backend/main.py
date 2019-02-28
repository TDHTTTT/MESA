"""
Main flask script. Defines the '/recommendation/' route and parses input. 

To start the flask server, run the following bash commands from the folder backend:
    export FLASK_APP=main.py
    export FLASK_ENV=development
    flask run

The server will automatically reload on any change to a file.
"""
# TODO: more robust query evaluation
from flask import Flask, request, jsonify
from recommendation.RecommendationResource import recommendResource

app = Flask(__name__)


@app.route("/recommendation/")
def recommendation():
    app.logger.info("Request: '{}'".format(request.args))

    # Ensure request args are correct format
    num_resources = int(request.args.get("num_resources"))
    query = _response_to_float_list(request.args.get("query"))

    # Get recommendation list
    responseRec = recommendResource(num_resources=num_resources, query=query)
    app.logger.info("Sending: '{}'".format(responseRec))

    # Return json of recommendation list
    return jsonify(responseRec)

def _response_to_float_list(float_list: str) -> [float]:
    str_list = float_list[1:-1].split(",")
    return [float(x) for x in str_list]

