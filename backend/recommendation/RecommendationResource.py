"""Public interface to machine learning recommendation modules."""
from recommendation.model import MLClassifier, read_train_data
from recommendation.ranking import rank_tasks
import numpy as np
import logging
from sklearn.feature_extraction import DictVectorizer


logger = logging.getLogger(__name__)

CLASSIFIER = None


def initModel() -> MLClassifier:
    """
    Trains model based on training data.
    If model has already been trained, do nothing.
    """
    global CLASSIFIER
    if CLASSIFIER is None:
        logger.debug("Training model...")
        CLASSIFIER = MLClassifier()
        X, Y = read_train_data("./data/tasks.json")
        CLASSIFIER.train(X,Y)
        logger.debug("Model trained successfully.")


def recommendTasks(num_resources: int, state: {}, context: {}) -> [float]:
    """
    Gets recommendations from the trained model based on query input.
    Train classifier if it hasn't been initialized yet. 
    """
    # Train classifier if None
    global CLASSIFIER
    if CLASSIFIER is None:
        initModel()

    # Find recommendations
    probabilities_tasks = CLASSIFIER.predict(__extract_feature_vector(state))
    print(probabilities_tasks)
    
    return rank_tasks(probabilities_tasks, context, num_resources)



def __extract_feature_vector(input):
    return np.array(list(input.values()))
