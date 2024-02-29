import React from 'react';
import { Link, useParams } from 'react-router-dom';
import hotelSchemas from '../data/hotelData'; // Update this with the correct path to your hotel data file

const HotelDetailPage = () => {
  const { id } = useParams(); // Extracting the hotel ID from URL params
  const hotel = hotelSchemas.flat().find(hotel => hotel.id === id); // Finding the hotel with the matching ID

  if (!hotel) {
    return <div>Hotel not found</div>; // If hotel is not found, display a message
  }

  return (
    <div>
      <h2>{hotel.name}</h2>
      <img src={hotel.image} alt={hotel.name} style={{ maxWidth: '100%', height: 'auto' }} />
      <Link to="/">Go back to homepage</Link>
    </div>
  );
};

export default HotelDetailPage;
