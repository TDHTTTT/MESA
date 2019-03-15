from data_collection.web_scraper import get_upcoming_events

def enrichTasks(list_of_tasks):
    enrichted_tasks = []
    for task in list_of_tasks:
        enrichted_tasks.append(__enrichTask(task))
    
    return enrichted_tasks

def __enrichTask(task):
    events = get_upcoming_events()

    if "workout" in task["labels"]:
        event1 = {
            "name" : events[0][2],
            "time": events[0][4].strftime("%H:%M"),
            "place": "ARC"
        }

        event2 = {
            "name": events[1][2],
            "time": events[1][4].strftime("%H:%M"),
            "place": "ARC"
        }
        task["event_data"] = [event1, event2]

    return task
