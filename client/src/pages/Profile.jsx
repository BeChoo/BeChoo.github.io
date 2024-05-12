import React, { useState, useEffect } from "react";
import axios from "axios";
import { useUser } from "./UserContext";

const Profile = () => {
  const [userReviews, setUserReviews] = useState([]);
  const [showReviews, setShowReviews] = useState(false);
  const [showSavedHotels, setShowSavedHotels] = useState(false);
  const [savedHotelDetails, setSavedHotelDetails] = useState([]);
  const { user } = useUser();

  useEffect(() => {
    if (user && user._id) {
      axios
        .get(
          `https://gotel-server-git-hosting-bechoos-projects.vercel.app/${user._id}`
        )
        .then((response) => {
          setUserReviews(response.data);
        })
        .catch((error) => {
          console.error("Error fetching reviews:", error);
        });
      if (user.savedHotels.length > 0) {
        fetchSavedHotels();
      }
    }
  }, [user]);

  const fetchSavedHotels = async () => {
    try {
      const responses = await Promise.all(
        user.savedHotels.map((hotel) =>
          axios
            .get(
              `https://gotel-server-git-hosting-bechoos-projects.vercel.app/${hotel.hotelId}`
            )
            .catch((err) => {
              console.error(
                "Failed to fetch hotel details for hotelId:",
                hotel.hotelId,
                err
              );
              return {
                data: {
                  id: hotel.hotelId,
                  name: hotel.hotelName,
                  details: "Details not available",
                },
              }; // Fallback data structure
            })
        )
      );
      const validResponses = responses.filter((res) => res !== null);
      setSavedHotelDetails(validResponses.map((res) => res.data));
    } catch (error) {
      console.error("Error fetching saved hotels:", error);
    }
  };

  const toggleReviews = () => setShowReviews(!showReviews);
  const toggleSavedHotels = () => setShowSavedHotels(!showSavedHotels);

  if (!user) {
    return <div>Please log in to view your profile.</div>;
  }

  return (
    <div className="profile">
      <h1>{user.name}'s Profile</h1>
      <button onClick={toggleReviews}>
        {showReviews ? "Hide Reviews" : "Show Reviews"}
      </button>
      {showReviews && (
        <div className="reviews">
          {userReviews.map((review, index) => (
            <div key={index} className="review-box">
              <img
                src={review.hotelImageURL}
                alt="Hotel"
                style={{ width: "100px", float: "left" }}
              />
              <div style={{ marginLeft: "110px" }}>
                <h3>{review.hotelName}</h3>
                <p>
                  {"★".repeat(review.rating)}
                  {"☆".repeat(5 - review.rating)}
                </p>
                <p>{review.reviewText}</p>
              </div>
            </div>
          ))}
        </div>
      )}
      <button onClick={toggleSavedHotels}>
        {showSavedHotels ? "Hide Saved Hotels" : "Show Saved Hotels"}
      </button>
      {showSavedHotels && (
        <div className="saved-hotels">
          {savedHotelDetails.length > 0 ? (
            savedHotelDetails.map((hotel) => (
              <div key={hotel.id}>
                <a href={`/hotel/${hotel.id}`}>{hotel.name}</a>
              </div>
            ))
          ) : (
            <p>No saved hotels yet.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Profile;
