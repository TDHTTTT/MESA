"""Scrapes data from UCI today website"""
from bs4 import BeautifulSoup
import time
from collections import OrderedDict
from data_collection.scrapers import scraper_util
import requests


def scrapeUCIToday():
    """
    Scrape data from the UCI today website
    """
    url = "https://today.uci.edu/calendar?event_types[]=92822"

    page = requests.get(url, verify=False)
    soup = BeautifulSoup(page.text, 'html.parser')

    schedule = soup.findAll("div", {"class": "item event_item vevent"})

    event_list_today = OrderedDict()
    label = "social"
    for c in schedule:
        title = c.find("h3", {"class": "summary"}).find("a").contents[0]
        description = c.find("h4", {"class": "description"}).contents[0]
        time = c.find("abbr", {"class": "dtstart"}).contents[2].strip()
        location = c.find("a", {"class": "event_item_venue"}).contents[1].strip()

        event_time = scraper_util.convert_time(time, "%I%p")
        t = list(event_time)
        t.insert(2, ":")
        event = {
            "name": title,
            "description": description,
            "time": ''.join(t),
            "label": label,
            "location": location,
        }

        if event_time in event_list_today:
            events = event_list_today[event_time]
            events.append(event)
            event_list_today.update({event_time: events})
        else:
            event_list_today.update({event_time: [event]})

    return event_list_today
