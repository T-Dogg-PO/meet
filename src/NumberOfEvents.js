import React, { Component } from "react";
import { ErrorAlert } from './Alert';

class NumberOfEvents extends Component {
    state = {
        eventsNumber: 32
    }

    // Function to update the state when there is a change to the number input. This also runs a function from the props (App.js) that will change the number of events showing on the screen
    handleInputChanged = (event) => {
        const value = event.target.value;
        if (value < 1 || value > 32 || isNaN(value)) {
            this.setState({
                errorText: 'Select a number from 1 to 32',
                eventsNumber: value
            });
        } else {
            this.setState({
                eventsNumber: value,
                errorText: ''
            });
            this.props.updateNumber(value);
        }
    };

    render() {
        return (
            <div className="numberOfEvents">
                <input 
                type="text" 
                className="events-number-input" 
                value={this.state.eventsNumber} 
                onChange={this.handleInputChanged} 
                onBlur={(e) => {
                    e.preventDefault();
                    this.setState({errorText: ''});
                }} />
                <ErrorAlert text={this.state.errorText} />
            </div>
        );
    }
}

export default NumberOfEvents;