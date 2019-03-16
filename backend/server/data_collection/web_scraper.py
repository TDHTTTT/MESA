import datetime
from collections import OrderedDict
import logging
from db import get_db, close_db
from data_collection.scrapers import scrape_uci_today, scrape_arc

logger = logging.getLogger(__name__)

time_classes_list = None
time_event_list = None

db_insert_query = """INSERT INTO events (
    dayOfWeek,
    name,
    time,
    label,
    location)
VALUES (
    ?,
    ?,
    ?,
    ?,
    ?);"""




def get_upcoming_events(label, number_of_events=2) -> list:
    """
    Get next 5 (or less if there's less today) upcoming events today.
    Returned as a list of tuples in the form:
        (database ID, day of week, name, time as string, time as Python datetime object)
    """
    g = get_db()
    cursor = g.cursor()

    now = datetime.datetime.today()
    today_day = now.strftime("%A")

    def four_digit_time_to_hour_min(time: int) -> (str, str):
        t_str = str(time)
        if len(t_str) == 3:
            return "0" + t_str[0], t_str[1:]
        elif len(t_str) == 4:
            if t_str[0:2] == "24":
                return "23", t_str[2:]
            return t_str[0:2], t_str[2:]

    def to_datetime(event: tuple) -> datetime.datetime:
        """key to sort event list by"""
        hour, minute = four_digit_time_to_hour_min(event[3])
        return now.replace(hour=int(hour), minute=int(minute))

    events_today = list()
    for row in cursor.execute("SELECT * FROM events WHERE label='{}'".format(label)):
        # logger.warning(tuple(row))
        if row["dayOfWeek"] == today_day:
            time = to_datetime(row)
            events_today.append(row[:4] + (time,))

    # Filter out events happening after now
    def now_or_later(event) -> bool:
        return event[4] > now
    events_today = list(filter(now_or_later, events_today))

    # Sort events by time
    events_today.sort(key=lambda x: x[4])

    logger.debug("Events today after now sorted: " + repr(events_today))

    close_db()
    if len(events_today) > number_of_events:
        return events_today[:number_of_events]
    else:
        return events_today


classes_list = None
event_list = None
def eventsToDb():
    """Insert scraped events into database"""
    now = datetime.datetime.today()
    today_day = now.strftime("%A")

    # global classes_list
    # if classes_list is None:
    #     classes_list = scrape_arc.scrapeARC()
    #     __commit_data_db(today_day, classes_list, "workout", location="ARC")

    global event_list
    if event_list is None:
        event_list = scrape_uci_today.scrapeUCIToday()
        __commit_data_db(today_day, event_list, "social")


def __commit_data_db(today_day, event_list, label, location=""):
    g = get_db()
    cursor = g.cursor()

    for time, events in event_list.items():
        for event in events:
            cursor.execute(db_insert_query, (today_day, event["name"], time, event["label"], event["location"]))

    g.commit()  # Turns out you need this
    close_db()
