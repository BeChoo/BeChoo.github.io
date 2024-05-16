import React, { useEffect, useState } from 'react';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';

const MapContainer = ({ google, city }) => {
  const [center, setCenter] = useState({ lat: 33.770050, lng: -118.193741 });

  useEffect(() => {
    if (city) {
      const geocoder = new google.maps.Geocoder();
      geocoder.geocode({ address: city }, (results, status) => {
        if (status === 'OK') {
          setCenter({
            lat: results[0].geometry.location.lat(),
            lng: results[0].geometry.location.lng()
          });
        } else {
          alert("Could not find location: " + city);
        }
      });
    }
  }, [city, google.maps.Geocoder]);

  return (
    <div>
      <Map
        google={google}
        zoom={12}
        center={center}
        style={{ width: '500px', height: '500px' }}
      >
        <Marker position={center} />
      </Map>
    </div>
  );
};

export default GoogleApiWrapper({
  apiKey: 'AIzaSyCx19ymBXj2YWJkocIIBiapQHQmzXzFnSQ'
})(MapContainer);
