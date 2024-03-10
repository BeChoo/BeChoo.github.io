import React, { Component } from 'react';
import { Map, GoogleApiWrapper } from 'google-maps-react';

// const API_KEY = process.env.REACT_APP_GMAPS_KEY;

class MapContainer extends Component {
  render() {
    // Define the styles for the map container
    const mapStyles = {
      width: '500px', // Adjust the width 
      height: '500px', // Adjust the height 
      display: 'flex' // Using flex to control layout
    };

    const defaultCoords = {
      lat: 33.7701,
      lng: -118.1937
    }

    return (
      // Render the Map component provided by google-maps-react
      <Map
        google={this.props.google}
        zoom={15}
        initialCenter={defaultCoords}
        style={mapStyles}
      />
    );
  }
}

// Export the MapContainer component wrapped with GoogleApiWrapper
export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_GMAPS_KEY
})(MapContainer)
