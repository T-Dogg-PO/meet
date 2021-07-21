import React from 'react';
import { shallow } from 'enzyme';
import CitySearch from '../CitySearch';
import { mockData } from '../mock-data';
import { extractLocations } from '../api';

// Group/scope for testing the CitySearch component of our app
describe('<CitySearch /> component', () => {
    let locations, CitySearchWrapper;
    beforeAll(() => {
        locations = extractLocations(mockData);
        CitySearchWrapper = shallow(<CitySearch locations={locations} />);
    });

    // Test to make sure the .city (a CSS class) textbox exists
    test('render text input', () => {
        expect(CitySearchWrapper.find('.city')).toHaveLength(1);
    });

    // Test to make sure the .suggestions (a CSS class) list exists
    test('renders a list of suggestions', () => {
        expect(CitySearchWrapper.find('.suggestions')).toHaveLength(1);
    });

    // Test to make sure the list of suggestions displayed match the search input
    test('renders text input correctly', () => {
        // Set the query const to the query element from the CitySearch state (i.e. what the user types into the search box)
        const query = CitySearchWrapper.state('query');
        // Compare the value prop of the element with the city class to the query element
        // The input fields 'value' prop should match what's in CitySearch's 'query' state
        expect(CitySearchWrapper.find('.city').prop('value')).toBe(query);
    });

    // Test to make sure the CitySearch state gets updated when a user types in their input
    test('change state when text input changes', () => {
        // Set the query state to Munich initially
        CitySearchWrapper.setState({
            query: 'Munich'
        });
        // The eventObject object tells it to change its value to Berlin once the change event is called
        // The handler function (.simulate()) will get the result from event.target.value (hence this formatting)
        const eventObject = { target: { value: 'Berlin' }};
        // Here the simulate() function is being run on the city element within CitySearch
        // It simulates a change on the city element, changing it to the target value (Berlin)
        CitySearchWrapper.find('.city').simulate('change', eventObject);
        // The value of query is compared to the string Berlin (which it should be with the simulated change above)
        expect(CitySearchWrapper.state('query')).toBe('Berlin');
    });

    // Test that the list of suggestions gets rendered correctly
    test('render list of suggestions correctly', () => {
        // Set the suggestions state to the full list of mock locations
        CitySearchWrapper.setState({ suggesstions: locations });
        const suggestions = CitySearchWrapper.state('suggestions');
        // Compare the number of rendered suggestions to the number of suggestions in the state of CitySearch
        // + 1 because a 'See all cities' suggestion will be manually added to the end of the list
        expect(CitySearchWrapper.find('.suggestions li')).toHaveLength(suggestions.length + 1);
        // Rendered text is checked to ensure it's taken from the state (i.e. it matches the suggestions state)
        for (let i = 0; i < suggestions.length; i += 1) {
            expect(CitySearchWrapper.find('.suggestions li').at(i).text()).toBe(suggestions[i]);
        }
    });

    // Test to ensure the suggestion list gets updated when the user searches using the input field
    test('suggestion list matches the query when changed', () => {
        // The states for query and suggestions is emptied
        CitySearchWrapper.setState({ query: '', suggestions: [] });
        // Change the value of the query field to Berlin
        CitySearchWrapper.find('.city').simulate('change', {
            target: { value: "Berlin" },
        });
        const query = CitySearchWrapper.state('query');
        // Filter out the full list of locations based on what's in the query field
        const filteredLocations = locations.filter((location) => {
            return location.toUpperCase().indexOf(query.toUpperCase()) > -1;
        });
        // Check that the CitySearch state for suggestions now equals the filteredLocations
        expect(CitySearchWrapper.state('suggestions')).toEqual(filteredLocations);
    });

    // Test to check that the displayed city is changed when the user selects a city from the list
    test("selecting a suggestion should change query state", () => {
        CitySearchWrapper.setState({
            query: 'Berlin'
        });
        const suggestions = CitySearchWrapper.state('suggestions');
        CitySearchWrapper.find('.suggestions li').at(0).simulate('click');
        expect(CitySearchWrapper.state('query')).toBe(suggestions[0]);
    });
});