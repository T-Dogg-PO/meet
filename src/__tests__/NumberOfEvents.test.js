import React from 'react';
import { shallow } from 'enzyme';
import NumberOfEvents from '../NumberOfEvents';

describe('<NumberOfEvents /> component', () => {
    let NumberOfEventsWrapper;
    beforeAll(() => {
        NumberOfEventsWrapper = shallow(<NumberOfEvents />);
    });

    // Test to ensure the NumberOfEvents component contains an input box for specifying the number of events
    test('render input box', () => {
        expect(NumberOfEventsWrapper.find('.events-number-input')).toHaveLength(1);
    });

    // Test to ensure the number of events showing by default is 32 (based on this components state)
    test('default number of events is 32', () => {
        expect(NumberOfEventsWrapper.state('eventsNumber')).toBe(32);
    });

    // Test to ensure the default starting value of the input box is the same as the default state (32)
    test('default input is 32', () => {
        expect(NumberOfEventsWrapper.find('.events-number-input').prop('value')).toBe(NumberOfEventsWrapper.state('eventsNumber'));
    });

    // Test to ensure the number of events is changed when the input box is updated (i.e. the state is updated)
    test('change state when input changes', () => {
        const eventObject = { target: { value: 10 } };
        NumberOfEventsWrapper.find('.events-number-input').simulate('change', eventObject);
        expect(NumberOfEventsWrapper.state('eventsNumber')).toBe(10);
    });
});