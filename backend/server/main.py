"""
Main flask script. Defines the '/recommendation/' route and parses input. 
"""
import os
from logging.config import dictConfig

from flask import Flask, request, jsonify

from recommendation.RecommendationResource import initModel, recommendTasks
from data_collection.scraper_scheduler import initScheduler
from data_collection.web_scraper import arcDataToDb, get_next_n_events
from data_collection.weather_conditions import get_status, is_okay_to_go_outside
from error_handling import InvalidArguments
import db

# Configure logging
dictConfig({
    "version": 1,
    "formatters": {"default": {
        "format": "%(module)s: %(message)s",
    }},
    "handlers": {"wsgi": {
        "class": "logging.StreamHandler",
        "stream": "ext://flask.logging.wsgi_errors_stream",
        "formatter": "default",
    }},
    "root": {
        "level": "INFO",
        "handlers": ["wsgi"],
    },
    # Allows loggers in submodules to run
    "disable_existing_loggers": False,
})

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
    def recommendation() -> "JSON List Response":
        """
        POST route that takes JSON object and returns ranked recommendations.
        Params:
            num_resources: int
            state: dict
            context: dict

        Returns:
            JSON dict of ranked tasks
        """
        app.logger.info("Request data: '{}'".format(request.data))

        # Ensure request data are in JSON format
        if not request.is_json:
            raise InvalidArguments(
                    "Request data is not in JSON format",
                    status_code=400
                )

        content = request.get_json()

        # If missing any arguments, abort with an error
        if not all(key in content for key in ("num_resources", "state", "context")):
            raise InvalidArguments(
                "Missing an argument: Expects num_resources, state, and context", 
                status_code=400
            )

        # Log request data
        num_resources = content["num_resources"]
        app.logger.info("Number of Resources: {}".format(num_resources))

        state = content["state"]
        app.logger.info("State: {}".format(state))

        context = content["context"]
        app.logger.info("Context: {}".format(context))

        # Get recommendation list
        responseRec = recommendTasks(num_resources=num_resources, state=state, context=context)
        app.logger.info("Sending: '{}'".format(responseRec))

        # Return json of recommendation list
        return jsonify(responseRec)

    
    # Define weather API routes
    @app.route("/weather/", methods=["GET"])
    def weather() -> "JSON String Response":
        """
        GET route returning weather status.
        Returns short string e.g. "Clear" or "Rain" describing the weather now.
        """
        app.logger.info("Serving request for current weather status.")
        return jsonify(get_status())

    @app.route("/outside/", methods=["GET"])
    def outside() -> "JSON Boolean Response":
        """
        GET route returning whether it's okay to go outside for an activity.
        Returns boolean. 
        """
        app.logger.info("Serving request for whether it's okay to go outside.")
        return jsonify(is_okay_to_go_outside())
    

    # Register database functions
    db.db_init_app(app)

    return app


if __name__ == '__main__':    
    # Start the server
    app = create_app()
    app.run(host='0.0.0.0', debug=True, port=5000)
