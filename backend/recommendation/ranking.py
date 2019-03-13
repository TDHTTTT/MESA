import logging
import numpy as np

logger = logging.getLogger(__name__)

def rank_tasks(probabilites, context, number_of_tasks, tContext) -> list:
    # output needs be of the form of [{"name" : "", "description:":"",event_data:{}}]
    tasks = {}
    for k,v in probabilites.items():
        data = {
            "name": k,
            "description" : tContext[k][0],
            "event_data" : {},
            "prob":  _personalize(k, v, context, tContext)
        }
        tasks[k] = data
    tasks = sorted(tasks.values(), key=lambda x:x['prob'], reverse=True)
    logger.info(str(tasks))
    # before returning truncate to number_of_tasks?
    return _dropProb(tasks)

def _dropProb(tasks):
    res = []
    for t in tasks:
        res.append({k:t[k] for k in t if k!="prob"})
    return res

def _personalize(key, probability, context, tContext) -> float:
    """
    Calculate the personalized probability for a single task
    """
    weight = 0
    for c in tContext[key][1]:
        weight += context[c]
    return _sigmoid(weight*probability) - 0.5

def _sigmoid(x):
    return 1/(1+np.exp(-x))
