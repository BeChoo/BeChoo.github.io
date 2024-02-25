import React, { Component } from 'react';
import { Map, GoogleApiWrapper } from 'google-maps-react';

class MapContainer extends Component {
  render() {
    // Define the styles for the map container
    const mapStyles = {
      width: '500px', // Adjust the width 
      height: '500px', // Adjust the height 
      display: 'flex' // Using flex to control layout
    };
    return (
      // Render the Map component provided by google-maps-react
      <Map
        google={this.props.google}
        zoom={15}
        initialCenter={{
          lat: 33.770050, // latitude of the center of the map
          lng: -118.193741 // longitude of the center of the map
        }}
        style ={mapStyles}
      />
    );
  }
}

// Export the MapContainer component wrapped with GoogleApiWrapper
export default GoogleApiWrapper({
  apiKey: 'AIzaSyBpcnohG7JvM8ZjcMmwN8ej0QG6wnb-TLI' 
})(MapContainer);