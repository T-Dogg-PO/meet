import React, { Component } from 'react';

// Create an Alert component, which will be the base component that the other alert components will inherit from
class Alert extends Component {
    // Inherit properties from Component, then define this.color
    constructor(props) {
        super(props);
        this.color = null;
    }

    // Define a getStyle function that will be called to define the colour of the alert
    getStyle = () => {
        return {
            color: this.color,
            fontWeight: 'bold',
        };
    }

    render() {
        return (
            <div className="Alert">
                <p style={this.getStyle()}>{this.props.text}</p>
            </div>
        );
    }
}

// Subclass that will define the colour for an info-alert
class InfoAlert extends Alert {
    // Inherit from parent component (Alert), then override the color property
    constructor(props) {
        super(props);
        this.color = 'blue';
    }
}

// Subclass that will define the colour for an error-alert
class ErrorAlert extends Alert {
    constructor(props) {
        super(props);
        this.color = 'red';
    }
}

// Subclass that will define the colour for a warning-alert
class WarningAlert extends Alert {
    constructor(props) {
        super(props);
        this.color = 'orange';
    }
}

export { InfoAlert, ErrorAlert, WarningAlert };