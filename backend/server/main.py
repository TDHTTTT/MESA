"""
Flask server configuration and creation script.

Creates Flask app instance and defines HTTP routes, logging, 
setup functions to run, and registers the database.

Defines three routes: 
    "/recommendation/": 
        POST route, takes context and state objects 
        to return ranked recommendation list

    "/weather/": 
        GET route, returns weather status as short string

    "/outside/": 
        GET route, returns whether it's okay to go outside i.e. whether 
        it's raining or snowing
"""
import os
from logging.config import dictConfig
from pprint import pformat
from flask import Flask, request, jsonify

from recommendation.recommendation_resource import initModel, recommendTasks
from data_collection.scraper_scheduler import initScheduler
from data_collection.weather_conditions import get_status, is_okay_to_go_outside
from data_collection.web_scraper import eventsToDb

from error_handling import InvalidArguments
import db

# Configure logging
# Logging output sent to console with the module prepended to the message
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
    Initialize actual app instance.

    Configure database, register functions to run before serving requests,
    define routes, and register database init command.

    NOTE: command "flask run" runs off of this function.
    """

    app = Flask(__name__, instance_relative_config=True)

    # Set database file path
    app.config.from_mapping(
        DATABASE="./flaskr.sqlite",
    )

    # Register initialization functions for machine learning and web scraping
    app.before_first_request(initModel)
    # app.before_first_request(initScheduler)
    app.before_first_request(eventsToDb)

    # Register error handler for bad arguments
    @app.errorhandler(InvalidArguments)
    def handle_invalid_arguments(error):
        response = jsonify(error.to_dict())
        response.status_code = error.status_code
        return response

    # Define HTTP routes
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
        app.logger.info("Request data: '{}'".format(pformat(request.data)))

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
        app.logger.info("State: {}".format(pformat(state)))

        context = content["context"]
        app.logger.info("Context: {}".format(pformat(context)))

        # Get recommendation list
        responseRec = recommendTasks(num_resources=num_resources, state=state, context=context)
        app.logger.info("Sending: '{}'".format(pformat(responseRec)))

        # Return json of recommendation list
        return jsonify(responseRec)

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
