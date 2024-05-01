import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useUser } from './UserContext'; // Make sure the path to your UserContext is correct

const Profile = () => {
     // State variables initialization
    const [userReviews, setUserReviews] = useState([]);
    const { user } = useUser(); // Using context to access user data
 
    // Fetch user reviews from backend when user data changes
    useEffect(() => {
        if (user) {
            axios.get(`/userReviews/${user._id}`)
                .then((response) => {
                    setUserReviews(response.data);
                })
                .catch((error) => {
                    console.error('Error fetching reviews:', error);
                });
        }
    }, [user]); // Dependency array to ensure the effect runs only when user changes

    // Render message if user is not logged in
    if (!user) {
        return <div>Please log in to view your profile.</div>;
    }

    // Render user profile with reviews
    return (
        <div className="profile">
            <h1>{user.name}'s Profile</h1>
            <h2>My Reviews</h2>
            <div className="reviews">
                {userReviews.length > 0 ? (
                    userReviews.map((review, index) => (
                        <div key={index} className="review">
                            <h3>Hotel ID: {review.hotelId}</h3>
                            <p>Rating: {review.rating}</p>
                            <p>Review: {review.reviewText}</p>
                        </div>
                    ))
                ) : (
                    <p>No reviews yet.</p>
                )}
            </div>
        </div>
    );
};

export default Profile;
