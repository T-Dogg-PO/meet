import React, { Component } from 'react';
import './App.css';
import EventList from './EventList';
import CitySearch from './CitySearch';
import NumberOfEvents from './NumberOfEvents';
import WelcomeScreen from './WelcomeScreen';
import EventGenre from './EventGenre';

import { getEvents, extractLocations, checkToken, getAccessToken } from './api';

import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

import './nprogress.css';
import { WarningAlert } from './Alert';

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
    // Use this boolean to only update the state if this.mounted is true
    this.mounted = true;
    const accessToken = localStorage.getItem('access_token');
    const isTokenValid = (await checkToken(accessToken)).error ? false : true;
    const searchParams = new URLSearchParams(window.location.search);
    const code = searchParams.get("code");
    // Show the welcome screen if either the code or the Access Token returns an error
    this.setState({
      showWelcomeScreen: !(code || isTokenValid)
    });
    if ((code || isTokenValid) && this.mounted) {
      getEvents().then((events) => {
        // Set the events and locations based on what's been input in the appropriate input fields
        if (this.mounted) {
          this.setState({ events: events.slice(0, this.state.numberOfEvents), locations: extractLocations(events) });
        }
        // Display the warning message if the user is offline
        if (!navigator.onLine) {
          this.setState({
            warningText: "You are currently in Offline Mode. Events may not be up to date. Please reconnect to the internet for an updated list of events."
          });
        } else {
          this.setState({
            warningText: ""
          });
        }
      });
    }
  }

  // Set this.mounted to false when the component is unmounted so that the state doesn't get updated
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

  // Function to update the number of events displaying on the page when the user inputs a new number
  updateNumber = (newNumberOfEvents) => {
    this.setState({
      numberOfEvents: newNumberOfEvents
    });
    this.updateEvents(this.state.currentLocation);
  }

  // Function to get the data for the ScatterChart
  getData = () => {
    const {locations, events} = this.state;
    const data = locations.map((location) => {
      const number = events.filter((event) => event.location === location).length;
      const city = location.split(', ').shift();
      return {city, number};
    });
    return data;
  };

  render() {
    // If showWelcomeScreen is undefined (which it should be on initial load) then display an empty div until the component has been mounted and the state can be updated
    if (this.state.showWelcomeScreen === undefined) return <div className="App" />

    const { locations, numberOfEvents, events } = this.state;

    return (
      <div className="App">
        <h1>Meet App</h1>
        <WarningAlert text={this.state.warningText} />
        <h4>Choose your city</h4>
        <CitySearch locations={locations} updateEvents={this.updateEvents} />
        <h4>Select the number of events to show on screen</h4>
        <NumberOfEvents updateNumber={this.updateNumber} numberOfEvents={numberOfEvents} />

        <div className="data-vis-wrapper">
          <EventGenre events={events} />

          <ResponsiveContainer height={400} >
            <ScatterChart margin={{ top: 20, right: 20, bottom: 10, left: 10 }}>
              <CartesianGrid />
              <XAxis type="category" dataKey="city" name="City" />
              <YAxis type="number" dataKey="number" name="Number of Events" allowDecimals={false} />
              <Tooltip cursor={{ strokeDasharray: '3 3' }} />
              <Scatter data={this.getData()} fill="#8884d8" />
            </ScatterChart>
          </ResponsiveContainer>
        </div>
        
        <EventList events={this.state.events} />

        <WelcomeScreen showWelcomeScreen={this.state.showWelcomeScreen} getAccessToken={() => { getAccessToken() }} />
      </div>
    );
  }
}

export default App;
