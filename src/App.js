import React, { Component } from 'react';
import './App.css';
import EventList from './EventList';
import CitySearch from './CitySearch';
import NumberOfEvents from './NumberOfEvents';
import { getEvents, extractLocations, checkToken, getAccessToken } from './api';
import { WarningAlert } from './Alert';
import WelcomeScreen from './WelcomeScreen';

import './nprogress.css';

class App extends Component {
  state = {
    events: [],
    locations: [],
    numberOfEvents: 32,
    currentLocation: 'all',
    showWelcomeScreen: undefined
  }

  // Part of loading events when the app loads. componentDidMount will make an API call and save the initial data to state
  async componentDidMount() {
    const accessToken = localStorage.getItem('access_token');   
    const isTokenValid = (await checkToken(accessToken)).error ? false : true;   
    const searchParams = new URLSearchParams(window.location.search);
    const code = searchParams.get("code");   
    this.setState({ showWelcomeScreen: !(code || isTokenValid) });
    // Use this boolean to only update the state if this.mounted is true
    if ((code || isTokenValid) && this.mounted) {
      getEvents().then((events) => {
        if (this.mounted) {
          this.setState({ events: events.slice(0, this.state.numberOfEvents), locations: extractLocations(events) });
        }
      });
    }
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
    if (this.state.showWelcomeScreen === undefined) return <div className="App" />  


    let warningText = ''

    if (!navigator.onLine) {
        warningText = 'You are currently offline, and the events you are viewing may not be up to date. Please connect to the internet to view an up-to-date list of events'
    }
    return (
      <div className="App">
        <WarningAlert text={warningText} />
        <CitySearch locations={this.state.locations} updateEvents={this.updateEvents} />
        <NumberOfEvents updateNumber={this.updateNumber} />
        <EventList events={this.state.events} />
        <WelcomeScreen showWelcomeScreen={this.state.showWelcomeScreen} getAccessToken={() => { getAccessToken() }} />
      </div>
    );
  }
}

export default App;
