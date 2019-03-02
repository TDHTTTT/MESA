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

Given the state, and additional context we compute a **state** vector of 5 elements all normalized to a value between 0.0-1.0:

[sadness, lonelyness, sleepyness, anxiousness, stress]

On top of that we provide a **context** vector based on interests and reactions on previous recommendations:

[time_of_day, sport, mindfulness, events, weather, activity(*)]

time_of_day = Morning, Afternoon, Night
sport = 0.0-1.0
mindfulness = 0.0-1.0
events=0.0-1.0
weather=Good/Bad???
activity=Low/High???

(*) are we going to use this?

Finally, both vectors are send from the phone to the backend where a set of tasks is found based on the **state** vector using machine learning and ranked according to the **context** vector