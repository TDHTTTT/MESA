# MESA

#### Tasks
A **task(z)**, ideally should have all the possible attributes in the **state(x)** and **context(y)** space. The value (0-5) (tbd) for each attribute would be determined by two questions:
1. **state(x)** "Should I do z if I am feeling x now?", with higher score being more favorable. 
2. **context(y)** "Should I do z if I it is y now?", with higher score being more favorable. (Note: it should cover all the subspace of each context.)

For example:
```json
{
  "yoga": {
    "state": {
      "sadness": 3.0,
      "lonelyness": 1.0,
      "sleepyness": 1.0,
      "anxiousness": 4.0,
      "stress": 5.0
    },
    "context": {
      "time_of_day([Morning,Afternoon,Night])": [5,4,1],
      "sport": 1.0, 
      "mindfulness": 1.0,
      "events": 1.0,
      "weather([Hot, Warm, Cold])": [5.0, 5.0, 5.0],
      "activity([Low, Moderate, High])": [5.0, 4.0, 4.5]
    }
  }
}
```
**Intepretation**:
You should do yoga if you are feeling anxious and stress. It does not help much if you feel lonelyness or sleepyness. Also, you should do yoga during the morning or afternoon but not at night. You should not practice yoga if there is sport/mindfulness/events going on (again I am not sure about this part). You could practice yoga no matter how the weather is. Finally, though it is more preferable to do yoga when the activity level is low, you are also encouraged to do it if the activity level is high (to reduce the stress probably).

Note the tasks should be designed by us. If we can find a way to automatically gives plausible scores value for each key, that would save us some time to manually input those. 
