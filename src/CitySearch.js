import React, { Component } from 'react';
import { InfoAlert } from './Alert';

class CitySearch extends Component {
    state = {
        query: '',
        suggestions: [],
        showSuggestions: undefined
    }

    // Function to update the state when the user types into the search box (query is what the user has typed into the search box, suggestions is the list of city suggestions)
    handleInputChanged = (event) => {
        const value = event.target.value;
        this.setState({showSuggestions:true});
        const suggestions = this.props.locations.filter((location) => {
            return location.toUpperCase().indexOf(value.toUpperCase()) > -1;
        });
        // Check to see if any suggestions are returned. If not, display the InfoAlert
        if (suggestions.length === 0) {
            this.setState({
                query: value,
                infoText: 'We cannot find the city you are looking for. Please try another city.',
                suggestions: []
            });
        } else {
            return this.setState({
                query: value,
                suggestions,
                infoText: ''
            });
        }
    };

    // Function to update the state when the user clicks on a search suggestion
    handleItemClicked = (suggestion) => {
        this.setState({
            query: suggestion,
            suggestions: [],
            showSuggestions: false,
            infoText: ''
        });

        this.props.updateEvents(suggestion);
    }

    render() {
        return (
            <div className="CitySearch">
                <InfoAlert text={this.state.infoText} />
                <input 
                type="text" 
                className="city" 
                value={this.state.query} 
                onChange={this.handleInputChanged} 
                onFocus={(e) => {
                    e.preventDefault();
                    this.setState({ showSuggestions: true });
                }}
                />
                <ul className="suggestions" style={this.state.showSuggestions ? {} : { display: 'none' }} >
                    {this.state.suggestions.map((suggestion) => (
                        <li key={suggestion} onClick={() => this.handleItemClicked(suggestion)}>{suggestion}</li>
                    ))}
                    <li key='all' onClick={() => this.handleItemClicked("all")}>
                        <b>See all cities</b>
                    </li>
                </ul>
            </div>
        );
    }
}

export default CitySearch;