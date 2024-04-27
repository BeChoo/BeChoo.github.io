import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import hotelSchemas from '../data/hotelData'; // Importing hotel data

const HotelDetailPage = () => {
  const { id } = useParams(); // Fetching id from URL params
  const [hotel, setHotel] = useState(hotelSchemas.flat().find((hotel) => hotel.id === id)); // Setting up state for hotel data
  const [latestReview, setLatestReview] = useState(''); // State for latest review

  // State and handlers for rating form
  const [isRatingFormVisible, setIsRatingFormVisible] = useState(false);
  const [selectedRating, setSelectedRating] = useState(0);

  // State and handlers for review form
  const [isReviewFormVisible, setIsReviewFormVisible] = useState(false);
  const [reviewText, setReviewText] = useState('');

  // Toggle visibility of rating form
  const toggleRatingFormVisibility = () => {
    setIsRatingFormVisible((prevVisibility) => !prevVisibility);
    setIsReviewFormVisible(false); // Hide review form
  };

  // Toggle visibility of review form
  const toggleReviewFormVisibility = () => {
    setIsReviewFormVisible((prevVisibility) => !prevVisibility);
    setIsRatingFormVisible(false); // Hide rating form
  };

  // Handler for selecting rating
  const handleRatingSelect = (rating) => {
    setSelectedRating(rating);
  };

  // Handler for submitting rating
  const handleSubmitRating = () => {
    // Calculate new average rating
    const totalRatings = hotel.ratings.length;
    const newTotalRatings = totalRatings + 1;
    const newAverageRating =
      (hotel.rating * totalRatings + selectedRating) / newTotalRatings;

    // Update hotel rating
    const updatedHotel = {
      ...hotel,
      rating: newAverageRating,
      ratings: [...hotel.ratings, selectedRating],
    };

    // Update hotel in state
    setHotel(updatedHotel);

    // Optionally, reset selected rating and hide the form
    setSelectedRating(0);
    setIsRatingFormVisible(false);
  };

  // Handler for submitting review
  const handleSubmitReview = () => {
    // Handle submission of review
    // For example, you might send the review to the server
    console.log('Review submitted:', reviewText);

    // Update latest review
    setLatestReview(reviewText);

    // Optionally, reset review text and hide the form
    setReviewText('');
    setIsReviewFormVisible(false);
  };

  // If hotel not found, display a message
  if (!hotel) {
    return <div>Hotel not found</div>;
  }

  const loremDescription =
    "Lorem ipsum dolor sit amet...";

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
        <h2>{hotel.name}</h2>
        <img
          src={hotel.image}
          alt={hotel.name}
          style={{ maxWidth: '100%', height: 'auto', marginBottom: '20px' }}
        />
        <div>
          <button onClick={toggleRatingFormVisibility} style={{ marginRight: '10px' }}>
            Leave a Rating
          </button>
          <button onClick={toggleReviewFormVisibility}>Leave a Review</button>
        </div>
        {isRatingFormVisible && (
          <div>
            <p>Select your rating:</p>
            <div>
              {[1, 2, 3, 4, 5].map((rating) => (
                <button
                  key={rating}
                  onClick={() => handleRatingSelect(rating)}
                  style={{ fontSize: '24px', marginRight: '5px' }}
                >
                  {rating <= selectedRating ? '★' : '☆'}
                </button>
              ))}
            </div>
            <button onClick={handleSubmitRating}>Submit Rating</button>
          </div>
        )}
        {isReviewFormVisible && (
          <div>
            <textarea
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              placeholder="Write your review here..."
              style={{ width: '100%', minHeight: '100px', marginBottom: '10px' }}
            />
            <button onClick={handleSubmitReview}>Submit Review</button>
          </div>
        )}
        <p>Rating: {hotel.rating}</p>
        <p>Average Price: ${hotel.priceAverage}</p>
        <p>Location: {hotel.location}</p>
        <p>Description: {loremDescription}</p>
        <p>Latest Review: {latestReview || 'None'}</p> {/* Render latest review */}
        <Link to="/homepage">Go back to homepage</Link>
      </div>
    </div>
  );
};

export default HotelDetailPage;
