Feature: Specify Number of Events on the Page

Scenario: When the user hasn't specified a number, 32 events show on the page by default
Given a user hasn't specified the number of events they want to show on the page
When the user loads the events list
Then 32 events should show on the page

Scenario: A user can change the number of events they want to show on a page
Given the user is looking at a list of events
When the user changes the setting for how many events are displayed on a page
Then the specified number of events should now show on the page