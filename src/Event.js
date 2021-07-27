import React, { Component } from 'react';

class Event extends Component {
    state = {
        showDetailsToggle: false
    }

    handleButtonClicked = () => {
        this.setState({
            showDetailsToggle: !this.state.showDetailsToggle
        });
    }

    render() {
        const { event } = this.props;

        return (
            <div className="event">
                <h1 className="event-name">{event.summary}</h1>
                <p className="start-time">{event.start.dateTime}</p>
                <p className="location">{event.location}</p>

                {this.state.showDetailsToggle ? 
                    <div className="about-event">
                        <h2>About Event:</h2>
                        <p className="event-description">{event.description}</p>
                        <button className="toggle-details" onClick={() => this.handleButtonClicked()} >Hide Event Details</button>
                    </div>
                    :
                    <button className="toggle-details" onClick={() => this.handleButtonClicked()} >Show Event Details</button>
                }
            </div>
        );
    }
}

export default Event;