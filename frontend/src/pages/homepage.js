// Filename - pages/homepage.js

import React from 'react';
import './homepage.css';
import MapContainer from './map';

const Homepage = () => {
  return (
    <div>
      <header>
        <h1>This is our homepage. Begin browsing hotels below!</h1>
      </header>

      <main>
        <form className="searchBar ">
          <input type="search" />
        </form>

        <div className="map-container center">
        <MapContainer />
        </div>

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

export default Homepage;