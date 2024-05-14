import React, { useState, useEffect } from "react";
import axios from "axios";
import { useUser } from "./UserContext";
import "./Profile.css"; // Ensure this is the correct path for your CSS file

const Profile = () => {
  const [userReviews, setUserReviews] = useState([]);
  const [showReviews, setShowReviews] = useState(false);
  const [showSavedHotels, setShowSavedHotels] = useState(false);
  const [savedHotelDetails, setSavedHotelDetails] = useState([]);
  const [newProfilePic, setNewProfilePic] = useState("");
  const { user } = useUser();

  useEffect(() => {
    if (user && user._id) {
      axios
        .get(`https://gotel-api.vercel.app/${userReviews}/${user._id}`)
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
              `https://gotel-api.vercel.app/api/hotelDetails/${hotel.hotelId}`
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

  const updateProfilePicture = () => {
    axios
      .post(`https://gotel-api.vercel.app/updateProfilePic`, {
        userId: user._id,
        profilePic: newProfilePic,
      })
      .then((response) => {
        alert("Profile picture updated successfully.");
        // Here you should update the user context or re-fetch the user data
      })
      .catch((error) => {
        console.error("Error updating profile picture:", error);
      });
  };

  const toggleReviews = () => setShowReviews(!showReviews);
  const toggleSavedHotels = () => setShowSavedHotels(!showSavedHotels);

  if (!user) {
    return <div>Please log in to view your profile.</div>;
  }

  return (
    <div className="profile">
      <img
        src={
          user.profilePic ||
          "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/2048px-Default_pfp.svg.png"
        }
        alt="Profile"
        className="profile-pic"
      />
      <h1>{user.name}'s Profile</h1>
      <div className="account-info">
        <p>Email: {user.email}</p>
        <p>Password: ••••••••</p> {/* Only display bullets for password */}
      </div>
      <div className="profile-pic-update">
        <input
          type="text"
          placeholder="Enter new profile picture URL"
          value={newProfilePic}
          onChange={(e) => setNewProfilePic(e.target.value)}
        />
        <button onClick={updateProfilePicture}>Update Profile Picture</button>
      </div>
      <button onClick={toggleReviews} className="toggle-button">
        {showReviews ? "Hide Reviews" : "Show Reviews"}
      </button>
      {showReviews && (
        <div className="reviews">
          {userReviews.map((review, index) => (
            <div key={index} className="review-box">
              <img
                src={review.hotelImageURL}
                alt="Hotel"
                className="hotel-image-small"
              />
              <div className="review-content">
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
      <button onClick={toggleSavedHotels} className="toggle-button">
        {showSavedHotels ? "Hide Saved Hotels" : "Show Saved Hotels"}
      </button>
      {showSavedHotels && (
        <div className="saved-hotels">
          {savedHotelDetails.map((hotel, index) => (
            <div key={hotel.id} className="hotel-listing">
              <a href={`/hotel/${hotel.id}`}>{hotel.name}</a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Profile;
