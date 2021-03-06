"""Performs personalization based on personal model to the general list of tasks."""
import logging
import numpy as np

logger = logging.getLogger(__name__)

def rank_tasks(probabilites, context, number_of_tasks, tContext) -> list:
    """Returns ranked list of tasks based on context and personal model."""
    # output needs be of the form of [{"name" : "", "description:":"",event_data:{}}]
    tasks = {}
    
    logger.info("Original Ranking:")
    for i, (key, prob) in enumerate(probabilites.items()):
        logger.info("{}. {}".format(i, key))
        task_info = {
            "name": key,
            "title": tContext[key]["title"],
            "description": tContext[key]["description"],
            "labels": tContext[key]["labels"],
            "event_data" : [],
            "prob":  _personalize(key, prob, context, tContext)
        }
        tasks[key] = task_info
    
    tasks = sorted(tasks.values(), key=lambda x:x['prob'], reverse=True)

    logger.info("Personalized Ranking:")
    for i, t in enumerate(tasks):
        logger.info("{}. {}".format(i, str(t["name"])))
    
    # before returning truncate to number_of_tasks?
    return _dropProb(tasks)[:number_of_tasks]

def _dropProb(tasks):
    """Removes a problematic "prob" field"""
    res = []
    for t in tasks:
        res.append({k:t[k] for k in t if k!="prob"})
    return res

def _personalize(key, probability, context, tContext) -> float:
    """
    Calculate the personalized probability for a single task
    """
    weight = 1
    for c in tContext[key]["labels"]:
        weight += context[c]
    return _sigmoid(weight*probability) - 0.5

def _sigmoid(x):
    return 1/(1+np.exp(-x))
