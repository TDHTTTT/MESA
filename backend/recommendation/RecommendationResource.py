"""Public interface to machine learning recommendation modules."""
from recommendation.model import MLClassifier, read_train_data
from recommendation.ranking import rank_tasks
import numpy as np
import logging
from sklearn.feature_extraction import DictVectorizer
import json

logger = logging.getLogger(__name__)

CLASSIFIER = None


def initModel() -> MLClassifier:
    """
    Trains model based on training data.
    If model has already been trained, do nothing.
    """
    global CLASSIFIER
    if CLASSIFIER is None:
        logger.info("Training model...")
        CLASSIFIER = MLClassifier()
        X, Y = read_train_data("./data/tasks.json")
        CLASSIFIER.train(X,Y)
        logger.info("Model trained successfully.")

def _readtContext() -> dict:
    """
    Gets the tasks' corresponding context labels for ranking
    """
    tContext = {}
    with open("./data/tasks.json") as f:
        data = json.load(f)
        for k,v in data.items():
            tContext[k] = (v['description'], v['labels'])
    return tContext
    

def recommendTasks(num_resources: int, state: {}, context: {}) -> dict:
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
    
    tContext = _readtContext()
    return rank_tasks(probabilities_tasks, context, num_resources, tContext)



def __extract_feature_vector(input):
    return np.array(list(input.values()))
