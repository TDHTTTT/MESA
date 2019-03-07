"""
Main flask script. Defines the '/recommendation/' route and parses input. 
"""
import os

from flask import Flask, request, jsonify

from recommendation.RecommendationResource import initModel, recommendTasks
<<<<<<< HEAD
import db


def create_app() -> Flask:
    """
    Create and configure the app. When run using 'flask run' from the terminal, this 
    function will be called to get the Flask application instance.
    """
=======
from data_collection.scraper_scheduler import initScheduler
from data_collection.web_scraper import scrapeARC, get_next_n_events


app = Flask(__name__)
app.before_first_request(initScheduler)
app.before_first_request(initModel)
app.before_first_request(scrapeARC)
>>>>>>> b48094f12c2ddb11057a46ac09dcfacd0e7af0c8

    app = Flask(__name__, instance_relative_config=True)

    # Set database file path
    app.config.from_mapping(
        DATABASE=os.path.join("/home/matt/Desktop/winter_quarter_2019/cs125/project/MESA/backend", "flaskr.sqlite"),
    )

    # Register training function to run before handling requests
    app.before_first_request(initModel)

    # Define the route we'll use to serve recommendation requests
    @app.route("/recommendation/", methods=['GET'])
    def recommendation() -> "JSON response":
        """
        GET route that takes two parameters, hands them off to recommendation
        algorithm, and sends back the result. 
        Params:
            num_resources: int
            query: [float]

<<<<<<< HEAD
        Returns:
            JSON list of floats representing ranked recommendations
=======
    # TODO here is just an example of getting the next assuming it is midnight 3 events for day 0 (Monday)
    # We need to further implement this, with recommandation and ranking.
    app.logger.debug(get_next_n_events(0, 0, 3))

    # Ensure request args are correct format
    num_resources = int(request.args.get("num_resources"))
    query = _response_to_float_list(request.args.get("query"))
>>>>>>> b48094f12c2ddb11057a46ac09dcfacd0e7af0c8

        """
        # The following comment disables an unnecessary pylint error that the app.logger
        # doesn't have the method "info" at this time. It will at runtime.
        #pylint: disable=E1101

        app.logger.info("Request args: '{}'".format(request.args))

        # Ensure request args are correct format
        num_resources = int(request.args.get("num_resources"))
        query = _response_to_float_list(request.args.get("query"))

        # Get recommendation list
        responseRec = recommendTasks(num_resources=num_resources, query=query)
        app.logger.info("Sending: '{}'".format(responseRec))

        # Return json of recommendation list
        return jsonify(responseRec)

    # Register database functions
    db.init_app(app)

    return app


def _response_to_float_list(float_list: str) -> [float]:
    """Converts a comma-separated string of list of floats to [float]"""
    str_list = float_list[1:-1].split(",")
    return [float(x) for x in str_list]


if __name__ == '__main__':    
    # Start the server
    app = create_app()
    app.run(host='0.0.0.0', debug=True, port=5000)
