import React from 'react';
import { Link } from 'react-router-dom';
import hotelSchemas from '../../../client/src/data/hotelData'; // Update this with the correct path to your hotel data file

const Homepage = () => {
  return (
    <div>
      {hotelSchemas.map((row, index) => (
        <div key={index} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
          {row.map((hotel, i) => (
            <div key={i} style={{ width: '30%' }}>
              <Link to={`/hotel/${hotel.id}`}>
                <h3>{hotel.name}</h3>
                <img src={hotel.image} alt={hotel.name} style={{ maxWidth: '100%', height: 'auto' }} />
              </Link>
            </div>
          ))}
          {/* Render an empty div only if there are exactly 2 hotels in the row */}
          {row.length === 2 && <div style={{ width: '30%' }}></div>}
        </div>
      ))}
    </div>
  );
};

export default Homepage;
