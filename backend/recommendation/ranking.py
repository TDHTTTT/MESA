import logging
import numpy as np

logger = logging.getLogger(__name__)

def rank_tasks(probabilites, context, number_of_tasks, tContext) -> dict:
    # output needs be of the form of {"tasksN": {"name": "", "prob","" ...}}
    tasks = {}
    for i, key in enumerate(sorted(probabilites, key=probabilites.get, reverse=True)):
        data = {
            "name":  key, 
            "prob":  _personalize(key, probabilites[key], context, tContext)
        }
        tasks.update({"task{}".format(i+1): data})
    # before returning truncate to number_of_tasks?
    logger.info(str(tasks))
    return tasks

def _personalize(key, probability, context, tContext) -> float:
    """
    Calculate the personalized probability for a single task
    """
    weight = 0
    for c in tContext[key]:
        weight += context[c]
    return _sigmoid(weight*probability) - 0.5

def _sigmoid(x):
    return 1/(1+np.exp(-x))
