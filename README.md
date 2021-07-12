# MEET
## A React app for finding events in different cities

## Purpose
The purpose of this MEET app is to practice building a serverless, progressive web application (PWA) with React using a test-driven development technique.

## User Story Scenarios (written with the Gherkin "Given-When-Then" syntax)

### Feature 1: Filter Events by City:
```
Scenario 1: When user hasn’t searched for a city, show upcoming events from all cities.
    **Given** user hasn’t searched for any city
    **When** the user opens the app
    **Then** the user should see a list of all upcoming events
```
```
Scenario 2: User should see a list of suggestions when they search for a city.
    **Given** the main page is open
    **When** user starts typing in the city textbox
    **Then** the user should see a list of cities (suggestions) that match what they’ve typed
```
```
Scenario 3: User can select a city from the suggested list.
    **Given** the user was typing “Berlin” in the city textbox and the list of suggested cities is showing
    **When** the user selects a city (e.g., “Berlin, Germany”) from the list
    **Then** their city should be changed to that city (i.e., “Berlin, Germany”) and the user should receive a list of upcoming events in that city
```

### Feature 2: Show/Hide an Event's Details:
```
Scenario 1: An event element is collapsed by default
    **Given** a user hasn't clicked on an event
    **When** the user is looking at a list of events
    **Then** the events should be collapsed (not showing the full details)
```
```
Scenario 2: A user can expand an event to see its details
    **Given** the user is looking at a list of events
    **When** the user clicks on the button to expand an events details
    **Then** that event should expand to show the full event details
```
```
Scenario 3: A user can collapse an event to hide its details
    **Given** a user has expanded an event
    **When** the user clicks on the button to hide event details
    **Then** the events should be collapsed (not showing the full details)
```

### Feature 3: Specify Number of Events on the Page:
```
Scenario 1: When the user hasn't specified a number, 32 events show on the page by default
    **Given** a user hasn't specified the number of events they want to show on the page
    **When** the user loads the events list
    **Then** 32 events should show on the page
```
```
Scenario 2: A user can change the number of events they want to show on a page
    **Given** the user is looking at a list of events
    **When** the user changes the setting for how many events are displayed on a page
    **Then** the specified number of events should now show on the page
```

### Feature 4: Use the App when Offline:
```
Scenario 1: Show cached data when there is no internet connection
    **Given** a user is offline
    **When** the app is loaded or in use
    **Then** the app should show cached data instead of live data
```
```
Scenario 2: Show error message when a user changes the settings (e.g. city, time range) while offline
    **Given** the user is offline
    **When** the user attempts to update any setting (e.g. city, time range, etc)
    **Then** the app should display an error message stating that the changes cannot be made without an internet connection
```

### Feature 5: Data Visualization:
```
Scenario 1: Show a chart with the number of upcoming events in each city
    **Given** a user is looking at the list of events
    **When** the user scrolls down to the Statistics section of the page
    **Then** the app should show a chart displaying the number of upcoming events per city
```
