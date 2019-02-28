"""
Main flask script. Defines the '/recommendation/' route and parses input. 
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


if __name__ == '__main__':    
    # Start the server
    app.run(host='0.0.0.0', debug=True, port=5000)

