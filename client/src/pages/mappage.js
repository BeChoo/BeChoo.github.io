import React, { useState } from 'react';
import './mappage.css'; // Importing CSS for styling
import MapContainer from './map'; // Importing MapContainer component

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
          <MapContainer city={city} /> {/* Rendering MapContainer component */}
        </div>

        {/* Row section for previous and next hotel */}
        <div className="row">
          <div className="column">
            <p>Previous Hotel <i className="arrow left"></i></p>
            <img src="https://via.placeholder.com/300" alt="Placeholder" />
            <p>Next Hotel <i className="arrow right"></i></p>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Mappage; // Exporting Homepage component