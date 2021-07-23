import React, { Component } from 'react';

class CitySearch extends Component {
    state = {
        query: '',
        suggestions: [],
        showSuggestions: undefined
    }

    // Function to update the state when the user types into the search box (query is what the user has typed into the search box, suggestions is the list of city suggestions)
    handleInputChanged = (event) => {
        const value = event.target.value;
        const suggestions = this.props.locations.filter((location) => {
            return location.toUpperCase().indexOf(value.toUpperCase()) > -1;
        });
        this.setState({
            query: value,
            suggestions
        });
    };

    // Function to update the state when the user clicks on a search suggestion
    handleItemClicked = (suggestion) => {
        this.setState({
            query: suggestion,
            showSuggestions: false
        });

        this.props.updateEvents(suggestion);
    }

    render() {
        return (
            <div className="CitySearch">
                <input 
                type="text" 
                className="city" 
                value={this.state.query} 
                onChange={this.handleInputChanged} 
                onFocus={() => { this.setState({ showSuggestions: true }) }} 
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