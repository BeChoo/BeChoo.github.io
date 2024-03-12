import React, { useState } from 'react';
import './mappage.css';
import MapContainer from './map';

// Functional component Homepage
const Mappage = () => {
  const [city, setCity] = useState('');

  const handleSearch = (event) => {
    event.preventDefault();
    const enteredCity = event.target.elements.city.value;
    setCity(enteredCity);
    event.target.elements.city.value = ''; // Clear the input field after submitting
  };

  return (
    <div>
      {/* Header section */}
      <header>
        <h1>Browse hotels below</h1>
      </header>
      {/* Main section */}
      <main>
        {/* Search bar */}
        <form className="searchBar" onSubmit={handleSearch}>
          <input type="search" name="city" placeholder="Enter city" />
          <button type="submit">Search</button>
        </form>

        {/* Map container */}
        <div className="map-container center">
          <MapContainer city={city} />
        </div>
      </main>
    </div>
  );
}

export default Mappage; // Exporting Homepage component