# Tomorrow.io-assignment

Hey! this is the simple version to the home assignment.

to run the project:

in /server: 
1. npm i 
2. npm run api 

in /client/weather-app:
1. npm i
2. npm run dev (tried to re-script it to 'npm-start' but didn't work)
                       
                       
Had to rebuild the project 'from scratch' in react-vite since i had some weird issues when i ran the 'npm i' command in the cloned directory from the assignment's repository and didn't want to bother you guys on a weekend so I just decided to advance forward, hope you can see that as a good thing :)

So a little bit about the functions in the assignment:


Dashboard.jsx

states-
1.allData - a merged object containing all three objects which came from the APIs, with a few new keys created based on given data.
2.refresh - a boolean value, for the purpose of re-rendering the component

functions-
1.useEffect() - runs when component mounts or re-mounts, acquiring the data from the API's and sends it to a different function.
2.mergeAllData() - gets the API's data and passes it through more functions.

2a.addDataToEvent() - calcuating and adds the keys: duration, hoursFromStart to each event. start refers to the earliest event's date at         midnight
2b. mergeObjects() - merging the objects after the necessary alterations
3. createRow() - create a row for each insight and it's events as a separate component
4. refreshDashboard() - changes the value of refresh to !refresh for re-rendreing

Also, attached a video of the final version 

https://user-images.githubusercontent.com/76867526/229657752-a31160bc-86d3-4256-98bd-80fa36238344.mov

