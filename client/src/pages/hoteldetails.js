// Importing necessary modules from React and React Router
import React from 'react';
import { Link, useParams } from 'react-router-dom';
import hotelSchemas from '../data/hotelData'; // Importing hotel data from the specified file path

// Functional component for displaying details of a hotel
const HotelDetailPage = () => {
  const { id } = useParams(); // Extracting the hotel ID from URL params
  const hotel = hotelSchemas.flat().find(hotel => hotel.id === id); // Finding the hotel with the matching ID

  // If hotel is not found, display a message
  if (!hotel) {
    return <div>Hotel not found</div>;
  }

  // Temporary Lorem Ipsum description
  const loremDescription = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed tincidunt commodo felis ut fringilla. Mauris feugiat turpis at mi placerat, non gravida nulla vestibulum. Duis vehicula nulla vitae dui facilisis, a vestibulum quam aliquam. Sed at lectus ut orci posuere dignissim non ut libero.";

  // Rendering the hotel details
  return (
    <div>
      <h2>{hotel.name}</h2>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <img src={hotel.image} alt={hotel.name} style={{ maxWidth: '100%', height: 'auto', marginRight: '20px' }} />
        <div>
          <button style={{ marginRight: '10px' }}>Leave a Rating</button>
          <button>Leave a Review</button>
        </div>
      </div>
      <p>Rating: {hotel.rating}</p>
      <p>Average Price: ${hotel.priceAverage}</p>
      <p>Location: {hotel.location}</p>
      <p>Description: {loremDescription}</p> {/* Displaying Lorem Ipsum description */}
      <Link to="/homepage">Go back to homepage</Link>
    </div>
  );
};

// Exporting the HotelDetailPage component
export default HotelDetailPage;
