import React from 'react';
import { mount, shallow } from 'enzyme';
import App from '../App';
import { mockData } from '../mock-data';
import { loadFeature, defineFeature } from 'jest-cucumber';
import CitySearch from '../CitySearch';
import { extractLocations } from '../api';

// loadFeature is used to load a Gherkin file
// Note that loadFeature expects the file path to start from the root of the project
const feature = loadFeature('./src/features/filterEventsByCity.feature');

// defineFeature is used to define the code for that file/feature loaded above
defineFeature(feature, test => {
    test('When user hasn\'t searched for a city, show upcoming events from all cities.', ({ given, when, then }) => {
        // No code required for this given() function because nothing has happened yet
        given('user hasn\'t searched for any city', () => {

        });

        // Define AppWrapper before the when() function so it's available in all following steps too
        let AppWrapper;
        // Code for opening the App
        when('the user opens the app', () => {
            AppWrapper = mount(<App />);
        });

        // expect() function in the then() statement to actually test that the correct lit of events is displayed
        then('the user should see the list of upcoming events.', () => {
            // The act of getting a list of events is an asynchronous action, so update the App component using AppWrapper.update()
            AppWrapper.update();
            expect(AppWrapper.find('.event')).toHaveLength(mockData.length);
        });
    });

    test('User should see a list of suggestions whe they search for a city', ({ given, when, then }) => {
        let CitySearchWrapper;
        let locations = extractLocations(mockData);
        given('the main page is open', () => {
            CitySearchWrapper = shallow(<CitySearch updateEvents={() => {}} locations={locations} />);
        });

        when('the user starts typing in the city textbox', () => {
            CitySearchWrapper.find('.city').simulate('change', { target: { value: 'Berlin' } });
        });

        // Test for 2 results (1 from mockData, and 1 from the manually added 'All Cities' option)
        then('the user should receive a list of cities (suggestions) that match what they\'ve typed', () => {
            expect(CitySearchWrapper.find('.suggestions li')).toHaveLength(2);
        });
    });

    test('User can select a city from the suggested list', ({ given, and, when, then }) => {
        let AppWrapper;
        // Async function to allow the App component to properly load events and locations
        given('user was typing "Berlin" in the city textbox', async () => {
            AppWrapper = await mount(<App />);
            AppWrapper.find('.city').simulate('change', { target: { value: 'Berlin' } });
        });

        and('the list of suggested cities is showing', () => {
            AppWrapper.update();
            expect(AppWrapper.find('.suggestions li')).toHaveLength(2);
        });

        when('the user selects a city (e.g., "Berlin, Germany") from the list', () => {
            AppWrapper.find('.suggestions li').at(0).simulate('click');
        });

        then('their city should be changed to that city (i.e., "Berlin, Germany")', () => {
            const CitySearchWrapper = AppWrapper.find(CitySearch);
            expect(CitySearchWrapper.state('query')).toBe('Berlin, Germany');
        });

        and('the user should receive a list of upcoming events in that city', () => {
            // The update() function here waits for the execution of clicking the Berlin option, so that the events list gets updated
            AppWrapper.update();
            expect(AppWrapper.find('.event')).toHaveLength(1);
        });
    });
});