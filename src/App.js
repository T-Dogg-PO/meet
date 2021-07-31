import React, { Component } from 'react';
import './App.css';
import EventList from './EventList';
import CitySearch from './CitySearch';
import NumberOfEvents from './NumberOfEvents';
import { getEvents, extractLocations } from './api';

import './nprogress.css';

class App extends Component {
  state = {
    events: [],
    locations: [],
    numberOfEvents: 32,
    currentLocation: 'all'
  }

  // Part of loading events when the app loads. componentDidMount will make an API call and save the initial data to state
  componentDidMount() {
    // Use this boolean to only update the state if this.mounted is true
    this.mounted = true;
    getEvents().then((events) => {
      if (this.mounted) {
        this.setState({ events: events.slice(0, this.state.numberOfEvents), locations: extractLocations(events) });
      }
    });
  }

  componentWillUnmount(){
    this.mounted = false;
  }

  // Function for updating the events state when a city is selected
  updateEvents = (location) => {
    getEvents().then((events) => {
      const locationEvents = (location === 'all') ? events : events.filter((event) => event.location === location);
      const slicedLocationEvents = locationEvents.slice(0, this.state.numberOfEvents);
      this.setState({
        events: slicedLocationEvents,
        currentLocation: location
      });
    });
  }

  updateNumber = (newNumberOfEvents) => {
    this.setState({
      numberOfEvents: newNumberOfEvents
    });
    this.updateEvents(this.state.currentLocation);
  }

  render() {
    return (
      <div className="App">
        <CitySearch locations={this.state.locations} updateEvents={this.updateEvents} />
        <NumberOfEvents updateNumber={this.updateNumber} />
        <EventList events={this.state.events} />
      </div>
    );
  }
}

export default App;