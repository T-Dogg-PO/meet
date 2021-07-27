import React from 'react';
import { mount } from 'enzyme';
import App from '../App';
import NumberOfEvents from '../NumberOfEvents';
import { mockData } from '../mock-data';
import { loadFeature, defineFeature } from 'jest-cucumber';

// loadFeature is used to load a Gherkin file
// Note that loadFeature expects the file path to start from the root of the project
const feature = loadFeature('./src/features/specifyNumberOfEvents.feature');

// defineFeature is used to define the code for that file/feature loaded above
defineFeature(feature, test => {
    // Test to ensure that 32 events are showing on the page if the user hasn't specified anything
    test('When the user hasn\'t specified a number, 32 events show on the page by default', ({ given, when, then }) => {
        // No code required here since the user hasn't done anything yet
        given('a user hasn\'t specified the number of events they want to show on the page', () => {

        });

        // Mount the App component here, since we need to interact with multiple components with these tests
        let AppWrapper;
        when('the user loads the events list', () => {
            AppWrapper = mount(<App />);
        });

        then('32 events should show on the page', () => {
            // The act of getting a list of events is an asynchronous action, so update the App component using AppWrapper.update()
            AppWrapper.update();
            // Check that the App state (numberOfEvents) is the default number of 32
            expect(AppWrapper.state('numberOfEvents')).toBe(32);
            // Check that the EventList has the correct number of events from its events prop (which in this case will be the same length as our mockData (2))
            expect(AppWrapper.find('.event')).toHaveLength(mockData.length);
        });
    });

    // Test to ensure the number of events change on the page when the user types into the input field
    test('A user can change the number of events they want to show on a page', ({ given, when, then }) => {
        // Mount the App component here
        let AppWrapper;
        // Async function because we need the App component to properly load the events before changing the number
        given('the user is looking at a list of events', async () => {
            AppWrapper = await mount(<App />);
        });

        // Simulate changing the number of events in the input box
        when('the user changes the setting for how many events are displayed on a page', () => {
            const eventObject = { target: { value: 1 } };
            let NumberOfEventsWrapper = AppWrapper.find(NumberOfEvents);
            NumberOfEventsWrapper.find('.events-number-input').simulate('change', eventObject);
        });

        // Check that the number of events on the page are now only showing 1
        then('the specified number of events should now show on the page', () => {
            AppWrapper.update();
            expect(AppWrapper.find('.event')).toHaveLength(1);
        });
    });
});