# MESA

## How to run

1. Start the backend first, see the [README.md](./backend/README.md).
2. Update the [config.js](./mesa/src/config.js) with the IP address of your server*.
3. Start the application, see the [README.md](./mesa/README.md).

(*) This is needed the phone is not able to find the server.

## Questions:

### Definition

**State**: Informs what is relevant (helps us search).
**Context**: (or *preference*) is what helps us rank the search results in a way that makes sense for the user.

### State
On a scale from 1-5, how much do you agree with the following statements:
1. I feel sad
2. I feel lonely
3. I feel sleepy
4. I feel anxious
5. I feel stressed
6. I feel angry

### Context?
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
    "stress": 0.0,
	"anger": 0.0
}
```

On top of that we provide a **context** JSON-object of key-value pairs based on interests and reactions on previous recommendations:

sport = 0.0-1.0
mindfulness = 0.0-1.0
social=0.0-1.0
activity=Low/High 

(determined using the context of time of day having done 4000 steps when it is still morning means activity is probably high. while 4000 when it is night is probably low activity. Also I have kept activity low/high, because when it comes to our recommendation phase, I am not sure what the meaning will be of medium.)

An example of the **context** JSON-object of key-value pairs can be:

```json
{
    "sport": 1.0,
    "mindfulness": 1.0,
    "social": 1.0,
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
		"stress": 0.0,
		"anger": 0.0
	},
	"context": {
		"sport": 1.0,
		"mindfulness": 1.0,
		"social": 1.0,
		"activity": "Low"
	}
}
```


### Determining Context (or Personalization)

Context is determined on the phone of the user using data collected from the user and the current environment. At the moment the following data sources are used to determine the context:

1. time_of_day [Morning, Afternoon, Night]
2. Weather [Bad, Medium, Good]
3. previous answers.

We select all previous answered feedback questions under the same (or similar) circumstances as now. Using that we compute the context JSON Object.
