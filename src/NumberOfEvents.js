import React, { Component } from "react";

class NumberOfEvents extends Component {
    state = {
        eventsNumber: 32
    }

    handleInputChanged = (event) => {
        const value = event.target.value;
        this.setState({
            eventsNumber: value
        });

        this.props.updateNumber(value);
    };

    render() {
        return (
            <div>
                <input type="number" className="events-number-input" value={this.state.eventsNumber} onChange={this.handleInputChanged} />
            </div>
        );
    }
}

export default NumberOfEvents;