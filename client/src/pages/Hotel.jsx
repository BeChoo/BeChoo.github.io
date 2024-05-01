import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useUser } from './UserContext'; // Ensure path to UserContext is correct
import './Hotel.css'; // Ensure path to CSS is correct

const Hotel = () => {
    // State variables initialization
    const [hotel, setHotel] = useState(null);
    const [rating, setRating] = useState(null);
    const [reviewText, setReviewText] = useState('');
    const [reviewSubmitted, setReviewSubmitted] = useState(false);
    const { user } = useUser();
    const { id } = useParams();

    // Fetch hotel details from backend on component mount
    useEffect(() => {
        const fetchHotelDetails = async () => {
            try {
                const response = await axios.get(`/api/hotelDetails/`, { params: { hotel_id: id } });
                setHotel(response.data);
            } catch (error) {
                console.error('Error fetching hotel details:', error);
            }
        };
        fetchHotelDetails();
        // Dependency array to ensure the effect runs only when id changes
    }, [id]);
 
    // Render loading message if hotel details are not yet available
    if (!hotel) {
        return <p>Loading hotel details...</p>;
    }

      // Destructure hotel data for easy access
    const { summary, propertyGallery, reviewInfo } = hotel;
    const topAmenities = summary?.amenities?.topAmenities?.items;

    // Event handler to set rating state
    const handleRating = (star) => {
        setRating(star);
    };

    // Function to submit a review
    const submitReview = async () => {
        if (!user || !user._id) {
            alert("Please log in to submit a review.");
            return;
        }
        try {
            await axios.post('http://localhost:3002/submitReview', {
                userId: user._id,
                hotelId: id,
                rating,
                reviewText,
            });
            setReviewSubmitted(true);
            alert("Review submitted successfully!");
        } catch (error) {
            console.error('Error submitting review:', error);
            alert("Failed to submit review.");
        }
    };

    return (
        <div>
            {/* Image Gallery Section */}
            <div className="image-gallery">
                <div className="main-image">
                    {propertyGallery?.images?.[0]?.image?.url && (
                        <img src={propertyGallery.images[0].image.url} alt="Main Hotel" />
                    )}
                </div>
                <div className="other-images">
                    {propertyGallery?.images?.slice(1, 5).map((image, index) => (
                        <div key={index} className="thumbnail-image">
                            <img src={image.image.url} alt={`Hotel Image ${index + 1}`} />
                        </div>
                    ))}
                </div>
            </div>

            {/* Navigation Bar */}
            <nav className="details-nav">
                <ul>
                    <li><a href="#overview">Overview</a></li>
                    <li><a href="#amenities">Amenities</a></li>
                </ul>
            </nav>

            {/* Overview Section */}
            <section id="overview">
                <h1>{summary?.name}</h1>
                <div className="rating">
                    {[1, 2, 3, 4, 5].map((star) => (
                        <span key={star} onClick={() => handleRating(star)} className={rating >= star ? 'filled' : ''}>☆</span>
                    ))}
                </div>
                {rating && (
                    <div className="review-form">
                        <textarea
                            placeholder="Write your review here..."
                            value={reviewText}
                            onChange={(e) => setReviewText(e.target.value)}
                        ></textarea>
                        <button onClick={submitReview}>Submit Review</button>
                    </div>
                )}
                <p>{summary?.tagline}</p>
                <div className="review-score">
                    <span className="score">{reviewInfo?.summary?.overallScoreWithDescriptionA11y?.value.split('/')[0]}</span>
                    <span className="description">{reviewInfo?.summary?.overallScoreWithDescriptionA11y?.value.split('10')[1]}</span>
                </div>
            </section>

            {/* Amenities Section */}
            <section id="amenities">
                <h2>Popular amenities</h2>
                <div className="amenities-container">
                    {topAmenities?.map((amenity, index) => (
                        <div key={index} className="amenity">
                            <p>{amenity?.text}</p>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default Hotel;
