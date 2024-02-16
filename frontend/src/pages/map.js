import React, { Component } from 'react';
import { Map, GoogleApiWrapper } from 'google-maps-react';

class MapContainer extends Component {
  render() {
    const mapStyles = {
      width: '500px', // Adjust the width as needed
      height: '500px', // Adjust the height as needed
      display: 'flex'
    };
    return (
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

export default GoogleApiWrapper({
  apiKey: 'AIzaSyBpcnohG7JvM8ZjcMmwN8ej0QG6wnb-TLI' // Replace 'YOUR_API_KEY' with your actual API key
})(MapContainer);