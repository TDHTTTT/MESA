from data_collection.web_scraper import get_upcoming_events

def enrichTasks(list_of_tasks):
    enrichted_tasks = []
    for task in list_of_tasks:
        enrichted_tasks.append(__enrichTask(task))
    
    return enrichted_tasks

def __enrichTask(task):
    workout_events = get_upcoming_events("workout", 1)
    social_events = get_upcoming_events("social", 1)

    if "social" in task["labels"]:
        task["event_data"] = social_events
    elif "workout" in task["labels"]:
        task["event_data"] = workout_events

    return task


