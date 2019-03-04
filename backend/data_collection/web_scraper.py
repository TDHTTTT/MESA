from bs4 import BeautifulSoup
import requests
from collections import OrderedDict
import logging

logger = logging.getLogger(__name__)

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
    6: "Sunday",
}

def convert_time(time):
    start, _ = time.split('-')

    if "am" in time:
        return start.replace(":", "")
    else:
        return str(int(start.replace(":", "")) + 1200)

def scrape_arc():
    logger.log("scraping arc...")
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
            time = convert_time(info_class[3])

            # Get the right schedule for each day from the list
            day_classes = time_classes_list[int_to_day[i % 7]]

            if time in day_classes:
                time_slot = day_classes[time]
                time_slot.append(sport)
                day_classes.update({time: time_slot})
            else:
                day_classes.update({time: [sport]})

            time_classes_list[int_to_day[i % 7]] = day_classes

    logger.log("Finished scraping the arc...")

    return time_classes_list
