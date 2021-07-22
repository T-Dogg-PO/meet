import React from 'react';
import { shallow } from 'enzyme';
import Event from '../Event';
import { mockData } from '../mock-data';

describe('<Event /> component', () => {
    let EventWrapper;
    beforeAll(() => {
        EventWrapper = shallow(<Event event={mockData[0]} />);
    });

    // Test to make sure the event is collapsed by default (not showing full details) by checking the EventWrapper state
    test('event is collapsed by default', () => {
        expect(EventWrapper.state('showDetailsToggle')).toBe(false);
    });

    // Test to make sure the toggle details button is rendered in the Event div when showDetailsToggle is false
    test('toggle-details button exists', () => {
        expect(EventWrapper.find('.toggle-details')).toHaveLength(1);
    });

    // Test to make sure the toggle-details button is showing the correct text by default (Show Event Details)
    test('toggle-details displays Show Event text when event is collapsed', () => {
        expect(EventWrapper.find('.toggle-details').text()).toBe('Show Event Details');
    });

    // Test to make sure the event name is rendered correctly
    test('event name exists', () => {
        expect(EventWrapper.find('.event-name')).toHaveLength(1);
    });

    // Test to make sure the event name is obtained correctly from the event props
    test('event name is correctly obtained from props', () => {
        expect(EventWrapper.find('.event-name').text()).toBe(mockData[0].summary);
    });

    // Test to make sure the start time is rendered
    test('start time exists', () => {
        expect(EventWrapper.find('.start-time')).toHaveLength(1);
    });

    // Test to make sure the start time is obtainted correctly from the event props
    test('start time is correctly obtained from props', () => {
        expect(EventWrapper.find('.start-time').text()).toBe(mockData[0].start.dateTime);
    });

    // Test to make sure the location is rendered
    test('location exists', () => {
        expect(EventWrapper.find('.location')).toHaveLength(1);
    });

    // Test to make sure the location is obtained correctly from the event props
    test('location is correctly obtained from props', () => {
        expect(EventWrapper.find('.location').text()).toBe(mockData[0].location);
    });

    // Test to make sure the About Event section is hidden by default (i.e. before the user has clicked Show Details)
    test('about event section is hidden by default', () => {
        expect(EventWrapper.find('.about-event')).toHaveLength(0);
    });

    // Test to make sure that when the toggle-details button is clicked the showDetailsToggle state is changed
    test('clicking Show Details button should change showDetailsToggle state', () => {
        EventWrapper.find('.toggle-details').simulate('click');
        expect(EventWrapper.state('showDetailsToggle')).toBe(true);
    });

    // When toggle-details button is clicked, the text of the button should be changed
    test('when the showDetailsToggle state is true, the toggle-details button should show "Hide Details"', () => {
        EventWrapper.setState({
            showDetailsToggle: true
        });
        expect(EventWrapper.find('.toggle-details').text()).toBe('Hide Event Details');
    });

    // Test to make sure that once the toggle-details button has been clicked and the state changed, the event-details section is rendered
    test('event-details is rendered after Show Details button is clicked', () => {
        EventWrapper.setState({
            showDetailsToggle: true
        });
        expect(EventWrapper.find('.about-event')).toHaveLength(1);
    });

    // Test to make sure the event-descrption section is correctly rendered
    test('event-description is rendered', () => {
        EventWrapper.setState({
            showDetailsToggle: true
        });
        expect(EventWrapper.find('.event-description')).toHaveLength(1);
    });

    // Test to make sure that the event-description section correctly gets the event description from the props
    test('event-description is correctly populated from props', () => {
        EventWrapper.setState({
            showDetailsToggle: true
        });
        expect(EventWrapper.find('.event-description').text()).toBe(mockData[0].description);
    });

    // Test to make sure that the showDetailsToggle state is returned to false when the Hide Details button is clicked
    test('showDetailsToggle is set to false when the Hide Details button is clicked', () => {
        EventWrapper.setState({
            showDetailsToggle: true
        });
        EventWrapper.find('.toggle-details').simulate('click');
        expect(EventWrapper.state('showDetailsToggle')).toBe(false);
    })
})