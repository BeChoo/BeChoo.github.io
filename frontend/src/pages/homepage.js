// Filename - pages/homepage.js

import React from 'react';
import './homepage.css'; // Importing CSS for styling
import MapContainer from './map'; // Importing MapContainer component

// Functional component Homepage
const Homepage = () => {
  return (
    <div>
      {/* Header section */}
      <header>
        <h1>This is our homepage. Begin browsing hotels below!</h1>
      </header>

      {/* Main section */}
      <main>
        {/* Search bar */}
        <form className="searchBar ">
          <input type="search" />
        </form>

        {/* Map container */}
        <div className="map-container center">
          <MapContainer /> {/* Rendering MapContainer component */}
        </div>

        {/* Row section for previous and next hotel */}
        <div className="row ">
          <div className="column">
            <p>Previous Hotel <i className="arrow left"></i></p>
            <img src="https://via.placeholder.com/300" alt="Placeholder" />
            <p>Next Hotel <i className="arrow right"></i></p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Homepage; // Exporting Homepage component
