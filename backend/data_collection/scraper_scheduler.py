from apscheduler.schedulers.background import BackgroundScheduler
from data_collection.web_scraper import scrapeARC

def initScheduler():
    scheduler = BackgroundScheduler()

    # Add jobs
    scheduler.add_job(scrapeARC, trigger='cron', hour=1)

    scheduler.start()
