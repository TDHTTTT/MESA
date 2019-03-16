from apscheduler.schedulers.background import BackgroundScheduler
from data_collection.web_scraper import eventsToDb

def initScheduler():
    scheduler = BackgroundScheduler(timezone="America/Los_Angeles")

    # Add jobs
    scheduler.add_job(eventsToDb, trigger='cron', hour=1)

    scheduler.start()
