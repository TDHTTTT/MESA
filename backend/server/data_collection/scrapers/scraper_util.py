import time

def __convert_time(time):
    start, _ = time.split('-')

    if "am" in time:
        return start.replace(":", "")
    else:
        return str(int(start.replace(":", "")) + 1200)


def convert_time(time_string, time_format):
    event_time_obj = time.strptime(time_string, time_format)
    event_time_str = "{}{}".format(
        event_time_obj.tm_hour, ("0" + str(event_time_obj.tm_min))[-2:])
    return event_time_str
