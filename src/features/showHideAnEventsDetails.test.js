import React from 'react';
import { shallow } from 'enzyme';
import Event from '../Event';
import { mockData } from '../mock-data';
import { loadFeature, defineFeature } from 'jest-cucumber';

// loadFeature is used to load a Gherkin file
// Note that loadFeature expects the file path to start from the root of the project
const feature = loadFeature('./src/features/showHideAnEventsDetails.feature');

// defineFeature is used to define the code for that file/feature loaded above
defineFeature(feature, test => {
    // Test to make sure the event details are collapsed by default
    test('An event element is collapsed by default', ({ given, when, then }) => {
        // No code for given here because the user doesn't need to do anything
        given('a user hasn\'t clicked on an event', () => {
            
        });

        // Define AppWrapper before the when() function so it's available in all the following steps too
        let EventWrapper;
        // Shallow mount the Event component (because we don't need to interact with other components in this test)
        when('the user is looking at a list of events', () => {
            EventWrapper = shallow(<Event event={mockData[0]} />);
        });

        // Look for the .about-event elements. Since they should be collapsed by default, we shouldn't find any
        then('the events should be collapsed (not showing the full details)', () => {
            // The act of getting the list of events is asynchronous, so update the App component using AppWrapper.update()
            EventWrapper.update();
            expect(EventWrapper.find('.about-event')).toHaveLength(0);
        });
    });
    
    // Test to make sure the details are expanded when the user clicks the Show Details button
    test('A user can expand an event to see its details', ({ given, when, then }) => {
        // Load the Event component here, because this test states that the user is already looking at an event
        let EventWrapper;
        given('the user is looking at a list of events', () => {
            EventWrapper = shallow(<Event event={mockData[0]} />);
        });

        // Simulate clicking on the Show Details button
        when('the user clicks on the button to expand an events details', () => {
            EventWrapper.find('.toggle-details').simulate('click');
        });

        // Check to make sure the .about-event element now exists
        then('that event should expand to show the full event details', () => {
            expect(EventWrapper.find('.about-event')).toHaveLength(1);
        });
    });
    
    // Test to make sure the details are hidden again when the user clicks the Hide Details button
    test('A user can collapse an event to hide its details', ({ given, when, then }) => {
        // In this given() section, load the Event component and then simulate the click on the Show Details button from above (to get the details showing before we try hiding them again)
        let EventWrapper;
        given('a user has expanded an event', () => {
            EventWrapper = shallow(<Event event={mockData[0]} />);
            EventWrapper.find('.toggle-details').simulate('click');
        });

        // Simulate clicking on the Hide Details button
        when('the user clicks on the button to hide event details', () => {
            EventWrapper.find('.toggle-details').simulate('click');
        });

        // Check to make sure the .about-event element is now hidden again
        then('the events should be collapsed (not showing the full details)', () => {
            expect(EventWrapper.find('.about-event')).toHaveLength(0);
        });
    });
});