from bs4 import BeautifulSoup
import datetime
from collections import OrderedDict
from data_collection.scrapers import scraper_util
import requests
import logging

logger = logging.getLogger(__name__)


int_to_day = {
    0: "Monday",
    1: "Tuesday",
    2: "Wednesday",
    3: "Thursday",
    4: "Friday",
    5: "Saturday",
    6: "Sunday"
}


def scrapeARC():
    """
    Scrape data from the ARC website
    """

    url = "https://www.campusrec.uci.edu/groupx/index.asp"

    logger.info("Scraping arc...")
    page = requests.get(url, verify=False)
    soup = BeautifulSoup(page.text, 'html.parser')
    schedule = soup.find("div", {"id": "tabs-7"})\
        .findAll("td", {"class", "gxb"})
    logger.info("obtained page...")
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
            time = scraper_util.__convert_time(info_class[3])

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
    now = datetime.datetime.today()
    today_day = now.strftime("%A")

    # format = OrderedDict([(time, list_events)]) --> dict(time: [{name, time, location, label}, {}, ...], time2: [])
    result = dict()
    for time, events in time_classes_list[today_day].items():
        for e in events:
            event = {
                "name": e,
                "time": time,
                "location": "ARC",
                "label": "workout"
            }

            if time in result:
                current_events = result[time]
                current_events.append(event)
                result.update({time: current_events})
            else:
                result.update({time: [event]})
    return result
