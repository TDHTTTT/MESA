from data_collection.web_scraper import get_upcoming_events

def enrichTasks(list_of_tasks):
    enrichted_tasks = []
    for task in list_of_tasks:
        enrichted_tasks.append(__enrichTask(task))
    
    return enrichted_tasks

def __enrichTask(task):
    events = get_upcoming_events()

    if "workout" in task["labels"]:
        event_list = []
        for i, event in enumerate(events):

            e = {
                "name" : event[2],
                "time": event[4].strftime("%H:%M"),
                "place": "ARC"
            }
            event_list.append(e)
            if i >= 2:
                break

        task["event_data"] = event_list

    return task
