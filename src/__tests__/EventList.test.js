import React from 'react';
import { shallow } from 'enzyme';
import EventList from '../EventList';
import Event from '../Event';
import { mockData } from '../mock-data';

describe('<EventList /> component', () => {
    // A test to make sure the number of events in the list (EventList) is what we expect
    test('render correct number of events', () => {
        // This test will only pass if EventList renders the correct number of events from it's events prop
        const EventListWrapper = shallow(<EventList events={mockData} />);
        expect(EventListWrapper.find(Event)).toHaveLength(mockData.length);
    });
});