"""
Main flask script. Defines the '/recommendation/' route and parses input. 
"""
import os

from flask import Flask, request, jsonify

from recommendation.RecommendationResource import initModel, recommendTasks
from data_collection.scraper_scheduler import initScheduler
from data_collection.web_scraper import arcDataToDb, get_next_n_events
from error_handling import InvalidArguments
import db


def create_app() -> Flask:
    """
    Create and configure the app. When run using 'flask run' from the terminal, this 
    function will be called to get the Flask application instance.
    """

    app = Flask(__name__, instance_relative_config=True)

    # Set database file path
    app.config.from_mapping(
        DATABASE="./flaskr.sqlite",
    )

    # Register initialization functions for machine learning and web scraping
    app.before_first_request(initModel)
    app.before_first_request(initScheduler)
    app.before_first_request(arcDataToDb)

    # Register error handler for bad arguments
    @app.errorhandler(InvalidArguments)
    def handle_invalid_arguments(error):
        response = jsonify(error.to_dict())
        response.status_code = error.status_code
        return response

    # Define the route we'll use to serve recommendation requests
    @app.route("/recommendation/", methods=['POST'])
    def recommendation() -> "JSON response":
        """
        GET route that takes two parameters, hands them off to recommendation
        algorithm, and sends back the result. 
        Params:
            num_resources: int
            query: [float]

        Returns:
            JSON list of floats representing ranked recommendations
        """
        # The following comment disables an unnecessary pylint error that the app.logger
        # doesn't have the method "info" at this time. It will at runtime.
        #pylint: disable=E1101

        app.logger.info("Request args: '{}'".format(request.args))
        app.logger.info("Request data: '{}'".format(request.data))

        # If missing any arguments, abort with an error
        # if not all(key in request.data for key in ("num_resources", "state", "context")):
        #     raise InvalidArguments(
        #         "Missing an argument: Expects num_resources, state, and context", 
        #         status_code=400
        #     )

        # Ensure request args are correct format
        if not request.is_json:
            raise InvalidArguments(
                    "Missing an argument: Expects json object containing: num_resources, state, and context",
                    status_code=400
                )
        content = request.get_json()
        num_resources = content["num_resources"]
        app.logger.info("Number of Resources: {}".format(num_resources))

        state = content["state"]
        app.logger.info("State: {}".format(state))

        context = content["context"]
        app.logger.info("Context: {}".format(context))


        # Get recommendation list
        # TODO: When model is updated, update arguments here. Currently passing state to
        #       the model as query
        responseRec = recommendTasks(num_resources=num_resources, state=state, context=context)
        app.logger.info("Sending: '{}'".format(responseRec))

        # Return json of recommendation list
        return jsonify(responseRec)

    # Register database functions
    db.init_app(app)

    return app


if __name__ == '__main__':    
    # Start the server
    app = create_app()
    app.run(host='0.0.0.0', debug=True, port=5000)
