def rank_tasks(probabilites, context, number_of_tasks):
    # output needs be of the form of {"tasksN": {"name": "", ...}
    tasks = {}
    for i, key in enumerate(sorted(probabilites, key=probabilites.get, reverse=True)):

        data = {
            "name":  key,
        }
        tasks.update({"task{}".format(i+1): data})

    return tasks
