# MESA

## Questions:

#### State
On a scale from 1-5, how much do you agree with the following statements:
1. I feel sad
2. I feel lonely
3. I feel sleepy
4. I feel anxious
5. I feel stressed

#### Context?
Possible, follow up questions based on the first 5:
On a scale to 1-5, how much do you agree with the following statements:
1. School work has been stressful
2. I have been sleeping well
3. I have participated in social events lately
4. I have been active lately

Given the state, and additional context we compute a **state** JSON-object of key-value pairs all normalized to a value between 0.0-1.0. 

For example:
```json
{
    "sadness": 0.0,
    "lonelyness": 0.0,
    "sleepyness": 0.0,
    "anxiousness": 0.0,
    "stress": 0.0
}
```

On top of that we provide a **context** JSON-object of key-value pairs based on interests and reactions on previous recommendations:

time_of_day = Morning, Afternoon, Night
sport = 0.0-1.0
mindfulness = 0.0-1.0
events=0.0-1.0
weather=Good/Bad???
activity=Low/High??? (*)

(*) are we going to use this?

An example of the **context** JSON-object of key-value pairs can be:

```json
{
    "time_of_day": "Morning",
    "sport": 1.0,
    "mindfulness": 1.0,
    "events": 1.0,
    "weather": "Good",
    "activity": "Low"
}
```

Finally, both vectors are send from the phone to the backend where a set of tasks is found based on the **state** JSON-object using machine learning and ranked according to the **context**  JSON-object.

When communicating this to the phone a JSON-object containing two key-value pairs are send to the phone each value containing another JSON object:

```json
{
	"state": {
		"sadness": 0.0,
		"lonelyness": 0.0,
		"sleepyness": 0.0,
		"anxiousness": 0.0,
		"stress": 0.0
	},
	"context": {
		"time_of_day": "Morning",
		"sport": 1.0,
		"mindfulness": 1.0,
		"events": 1.0,
		"weather": "Good",
		"activity": "Low"
	}
}
```
