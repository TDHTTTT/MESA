from bs4 import BeautifulSoup
import requests
from collections import OrderedDict
import logging
from db import get_db

logger = logging.getLogger(__name__)

time_classes_list = None

url_list = {
    "arc": {
        "url": "https://www.campusrec.uci.edu/groupx/index.asp"
    }
}

int_to_day = {
    0: "Monday",
    1: "Tuesday",
    2: "Wednesday",
    3: "Thursday",
    4: "Friday",
    5: "Saturday",
    6: "Sunday"
}

db_insert_query = """INSERT INTO events (
    dayOfWeek,
    name,
    time)
VALUES (
    ?,
    ?,
    ?);"""

def __convert_time(time):
    start, _ = time.split('-')

    if "am" in time:
        return start.replace(":", "")
    else:
        return str(int(start.replace(":", "")) + 1200)


def scrapeARC():
    """
    Scrape data from the ARC website
    """
    global time_classes_list

    logger.info("scraping arc...")
    page = requests.get(url_list["arc"]["url"])
    soup = BeautifulSoup(page.text, 'html.parser')
    schedule = soup.find("div", {"id": "tabs-7"})\
                .findAll("td", {"class", "gxb"})

    time_classes_list = {
        "Monday": OrderedDict(),
        "Tuesday": OrderedDict(),
        "Wednesday": OrderedDict(),
        "Thursday": OrderedDict(),
        "Friday": OrderedDict(),
        "Saturday": OrderedDict(),
        "Sunday": OrderedDict()
    }

    for i, c in enumerate(schedule):
        info_class = c.text.split()

        if len(info_class) == 4:
            sport = info_class[0]
            time = __convert_time(info_class[3])

            # Get the right schedule for each day from the list
            day_classes = time_classes_list[int_to_day[i % 7]]

            if time in day_classes:
                time_slot = day_classes[time]
                time_slot.append(sport)
                day_classes.update({time: time_slot})
            else:
                day_classes.update({time: [sport]})

            time_classes_list[int_to_day[i % 7]] = day_classes

    logger.info("Finished scraping the arc...")


def arcDataToDb():
    """Insert scraped events into database"""
    global time_classes_list
    if time_classes_list is None:
        scrapeARC()

    g = get_db()
    cursor = g.cursor()

    for day, events in time_classes_list.items():
        for time, events in events.items():
            for name in events:
                cursor.execute(db_insert_query, (day, name, time))


def get_next_n_events(day, time, N):
    """
    day: 0-6 (0: monday, 1: tuesday, etc.)
    time: goes from 0-2400
    N: integer, gives N classes back or all the upcoming classes today
    """
    count = 0
    classes = dict()

    today_classes = time_classes_list[int_to_day[day]]

    for class_time in today_classes.keys():
        if int(class_time) > time:
            classes.update({class_time: today_classes[class_time]})
            count += 1
            if count == 5:
                break 

    return classes

