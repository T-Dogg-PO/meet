import React from 'react';
import { shallow, mount } from 'enzyme';
import App from '../App';
import EventList from '../EventList';
import CitySearch from '../CitySearch';
import NumberOfEvents from '../NumberOfEvents';
import { mockData } from '../mock-data';
import { extractLocations, getEvents } from '../api';

// A new group/scope called '<App /> component' to help keep tests organised
describe('<App /> component', () => {
    // Use beforeAll() to execue the code for rendering the App component before every test
    let AppWrapper;
    beforeAll(() => {
        AppWrapper = shallow(<App />);
    });

    // The first test, requiring a list of events to be rendered
    test('render list of events', () => {
        // The test itself, which looks for EventList components within AppWrapper, then compares the result with the expected result (1)
        expect(AppWrapper.find(EventList)).toHaveLength(1);
    });

    // The second scenario test, which will bring up a list of suggestions when a user searches for something
    // The first test is always to make sure the required component exists
    test('render CitySearch', () => {
        expect(AppWrapper.find(CitySearch)).toHaveLength(1);
    });

    // Test to ensure the NumberOfEvents component is rendered
    test('render NumberOfEvents', () => {
        expect(AppWrapper.find(NumberOfEvents)).toHaveLength(1);
    });
});

// Separate scope for integration tests
describe('<App /> integration', () => {
    // Test to ensure EventList gets events as a prop from App (where it's defined in App's state)
    test('App passes "events" state as a prop to EventList', () => {
        // Because we are rendering the components children, we need full rendering API (mount)
        const AppWrapper = mount(<App />);
        const AppEventsState = AppWrapper.state('events');
        // Ensure the events state isn't undefined
        expect(AppEventsState).not.toEqual(undefined);
        // Compare the state of App's events with EventLists's events prop
        expect(AppWrapper.find(EventList).props().events).toEqual(AppEventsState);
        // Because full rendering mounts the component to the DOM, call unmount() to 'clean up' the DOM
        AppWrapper.unmount();
    });

    // Test to ensure CitySearch gets passed locations from the App state as a prop
    test('App passes "locations" state as a prop to CitySearch', () => {
        const AppWrapper = mount(<App />);
        const AppLocationsState = AppWrapper.state('locations');
        expect(AppLocationsState).not.toEqual(undefined);
        expect(AppWrapper.find(CitySearch).props().locations).toEqual(AppLocationsState);
        AppWrapper.unmount();
    });

    // Test to ensure that when a user clicks on a city suggestion, only events from that city are shown
    // async is added here because the tests callback function contains async code
    test('get list of events matching the city selected by the user', async () => {
        const AppWrapper = mount(<App />);
        const CitySearchWrapper = AppWrapper.find(CitySearch);
        const locations = extractLocations(mockData);
        CitySearchWrapper.setState({ suggestions: locations });
        const suggestions = CitySearchWrapper.state('suggestions');
        // selectedIndex will hold the index of the selected suggestion from the suggestions array
        // The Math function will evaluate an integer ranging from 0 to suggestions.length - 1
        const selectedIndex = Math.floor(Math.random() * (suggestions.length));
        const selectedCity = suggestions[selectedIndex];
        // Calling instance() on the CitySearch wrapper allows you to call functions in that component
        // await is used because handleItemClicked is expected to have async code that involves fetching the
        // full list of events that match the selected city
        await CitySearchWrapper.instance().handleItemClicked(selectedCity);
        const allEvents = await getEvents();
        const eventsToShow = allEvents.filter(event => event.location === selectedCity);
        expect(AppWrapper.state('events')).toEqual(eventsToShow);
        AppWrapper.unmount();
    });

    // Test to ensure that all events are shown when "See all cities" is selected
    test('get list of all events when user selected "see all cities"', async () => {
        const AppWrapper = mount(<App />);
        const suggestionItems = AppWrapper.find(CitySearch).find('.suggestions li');
        // Simulate a click on the last item (which is the manually added "See all cities" button)
        await suggestionItems.at(suggestionItems.length - 1).simulate('click');
        const allEvents = await getEvents();
        expect(AppWrapper.state('events')).toEqual(allEvents);
        AppWrapper.unmount();
    })
});