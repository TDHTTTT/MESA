"""Public interface to machine learning recommendation modules."""
from recommendation import model
import numpy as np
import logging

logger = logging.getLogger(__name__)

CLASSIFIER = None


def initModel() -> model.MLClassifier:
    """
    Trains model based on training data.
    If model has already been trained, do nothing.
    """
    global CLASSIFIER
    if CLASSIFIER is None:
        logger.debug("Training model...")
        CLASSIFIER = model.MLClassifier()
        X, Y = model.read_train_data("./data/data.csv")
        CLASSIFIER.train(X,Y)
        logger.debug("Model trained successfully.")


def recommendTasks(num_resources: int, query: [float]) -> [float]:
    """
    Gets recommendations from the trained model based on query input.
    Train classifier if it hasn't been initialized yet. 
    """
    # Train classifier if None
    global CLASSIFIER
    if CLASSIFIER is None:
        initModel()
        
    # Find recommendations
    out = CLASSIFIER.predict(query)

    # Use context to sort recommendation
    sorted_out = np.argsort(-out)

    # Return sorted recommendations
    return sorted_out[0:num_resources].tolist()

