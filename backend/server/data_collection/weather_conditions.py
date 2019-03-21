"""Simple interface to OpenWeatherMap API"""

import pyowm


OWM_KEY = "de273f5fce576a683552bcf5f518c381"
IRVINE_ID = 5359777


# Initalize weather API with private key
OWM = pyowm.OWM(OWM_KEY)


def get_status() -> str:
    """Returns short status of current weather state e.g. Rain or Clear"""
    observation = OWM.weather_at_id(IRVINE_ID)
    return observation.get_weather().get_status()

def is_okay_to_go_outside() -> bool:
    """Checks if it's raining or snowing outside."""
    observation = OWM.weather_at_id(IRVINE_ID)
    status = observation.get_weather().get_status()

    result = {
        "weather": str(status != "Rain" and status != "Snow")
    }
    return result

