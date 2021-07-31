import React, { Component } from "react";
import { ErrorAlert } from './Alert';

class NumberOfEvents extends Component {
    state = {
        eventsNumber: 32
    }

    handleInputChanged = (event) => {
        const value = event.target.value;
        if (value < 1 || value > 32 || isNaN(value)) {
            this.setState({
                errorText: 'Select a number from 1 to 32',
                eventsNumber: ''
            });
            event.target.value = '';
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
                <input type="number" className="events-number-input" value={this.state.eventsNumber} onChange={this.handleInputChanged} />
                <ErrorAlert text={this.state.errorText} />
            </div>
        );
    }
}

export default NumberOfEvents;