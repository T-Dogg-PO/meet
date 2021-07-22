import React from 'react';
import { shallow } from 'enzyme';
import App from '../App';
import EventList from '../EventList';
import CitySearch from '../CitySearch';
import NumberOfEvents from '../NumberOfEvents';

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