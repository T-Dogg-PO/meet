Feature: Show/Hide an Event's Details

Scenario: An event element is collapsed by default
Given a user hasn't clicked on an event
When the user is looking at a list of events
Then the events should be collapsed (not showing the full details)

Scenario: A user can expand an event to see its details
Given the user is looking at a list of events
When the user clicks on the button to expand an events details
Then that event should expand to show the full event details

Scenario: A user can collapse an event to hide its details
Given a user has expanded an event
When the user clicks on the button to hide event details
Then the events should be collapsed (not showing the full details)
