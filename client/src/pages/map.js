import React, { useEffect, useState } from 'react';
import { Map, GoogleApiWrapper } from 'google-maps-react';

const MapContainer = ({ google }) => {
  const [center, setCenter] = useState({ lat: 33.770050, lng: -118.193741 });
  const [cities] = useState(['New York', 'Los Angeles', 'Chicago', 'San Francisco', 'Seattle']); // List of cities

  const handleSearch = (cityName) => {
    const city = cityName.trim();
    if (cities.includes(city)) {
      // Fetch the coordinates for the entered city
      // For demonstration, set default coordinates for San Francisco
      setCenter({ lat: 37.7749, lng: -122.4194 });
    } else {
      console.log(`City '${city}' not found.`);
      // You can provide feedback to the user that the city is not found
    }
  };

  useEffect(() => {
    // Set default coordinates when component mounts
    setCenter({ lat: 33.770050, lng: -118.193741 });
  }, []);

  return (
    <div>
      <Map
        google={google}
        zoom={15}
        initialCenter={center}
        style={{ width: '500px', height: '500px' }}
      />
    </div>
  );
};

// Export the MapContainer component wrapped with GoogleApiWrapper
export default GoogleApiWrapper({
  apiKey: 'AIzaSyBpcnohG7JvM8ZjcMmwN8ej0QG6wnb-TLI'
})(MapContainer);