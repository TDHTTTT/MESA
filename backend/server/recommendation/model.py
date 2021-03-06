"""Initializes machine learning model and trains it on collected training data."""
from sklearn.naive_bayes import GaussianNB
import numpy as np
import json
import logging 

logger = logging.getLogger(__name__)

def __get_training_data(data):
    return np.array([
        data["sadness"],
        data["lonelyness"],
        data["sleepyness"],
        data["anxiousness"],
        data["stress"],
        data["anger"]
    ])

def read_train_data(file_name):
    """
    Read a JSON file with training data, with for each task there are multiple "states"
    """

    data = None
    with open(file_name) as f:
        data = json.load(f)

    X = []
    Y = []
    for task, data in data.items():
        for state in data["states"]:
            X.append(np.array(__get_training_data(state)))
            Y.append(task)

    X = np.asarray(X)
    Y = np.asarray(Y)
    logger.info("Training data X: \n{}".format(X))
    logger.info("Training data Y: \n{}".format(Y))

    return X, Y

class MLClassifier:
    """
    Initialize a Machine Learning model.
    """

    def __init__(self, classifier=GaussianNB()):
        self.classifier = classifier

    def train(self, features, target):
        self.classifier.fit(features, target)

    def predict(self, data):
        arr = np.asarray(data)
        tasks = self.classifier.classes_
        probs = self.classifier.predict_proba(arr.reshape(1, -1))[0]

        logger.info("Tasks: {}".format(tasks))
        logger.info("Probs: {}".format(probs))
        
        task_prob_dict = {}
        for task, prob in zip(tasks, probs):
            task_prob_dict.update({task: prob})

        return task_prob_dict

