import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useUser } from "./UserContext"; // Ensure path to UserContext is correct
import "./Hotel.css"; // Ensure path to CSS is correct
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const Hotel = () => {
  const [hotel, setHotel] = useState(null);
  const [rating, setRating] = useState(null);
  const [reviewText, setReviewText] = useState("");
  const [isSaved, setIsSaved] = useState(false);
  const { user, addReview, updateSavedHotels } = useUser();
  const [map, setMap] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchHotelDetails = async () => {
      try {
        // Construct the URL to your internal API that wraps the external Hotels.com API call
        const url = `/api/hotelDetails?hotel_id=${id}`;
        const response = await axios.get(url);
        setHotel(response.data);
        const alreadySaved = user?.savedHotels.some(
          (hotel) => hotel.hotelId === id
        );
        setIsSaved(alreadySaved);
      } catch (error) {
        console.error("Error fetching hotel details:", error);
      }
    };
    fetchHotelDetails();
  }, [id, user?.savedHotels]); // Ensure dependency on user's saved hotels

  // useEffect to add a marker once hotel and map are loaded
  useEffect(() => {
    if (hotel && map) {
      const position = new google.maps.LatLng(
        hotel.summary.location.coordinates.latitude,
        hotel.summary.location.coordinates.longitude
      );

      new google.maps.Marker({
        position: position,
        map: map,
        title: hotel.summary.name,
      });
    }
  }, [hotel, map]); // Depend on hotel and map being loaded

  const handleRating = (star) => {
    setRating(star);
  };

  const submitReview = async () => {
    if (!user || !user._id) {
      alert("Please log in to submit a review.");
      return;
    }
    try {
      const { data } = await axios.post(
        "https://gotel-frontend-git-hosting-bechoos-projects.vercel.app/submitReview",
        {
          userId: user._id,
          hotelId: id,
          hotelName: hotel.summary.name,
          hotelImageURL: hotel.propertyGallery.images[0].image.url,
          rating,
          reviewText,
        }
      );
      addReview(data.review);
      alert("Review submitted successfully!");
    } catch (error) {
      console.error("Error submitting review:", error);
      alert("Failed to submit review.");
    }
  };

  const toggleSave = async () => {
    const action = isSaved ? "unsaveHotel" : "saveHotel";
    const hotelName = !isSaved ? hotel.summary.name : undefined;
    try {
      const response = await axios.post(
        `https://gotel-frontend-git-hosting-bechoos-projects.vercel.app/${action}`,
        {
          userId: user._id,
          hotelId: id,
          hotelName,
        }
      );
      setIsSaved(!isSaved);
      updateSavedHotels(response.data);
    } catch (error) {
      console.error("Error toggling save:", error);
    }
  };

  const defaultCenter = {
    lat: hotel?.summary?.location?.coordinates?.latitude,
    lng: hotel?.summary?.location?.coordinates?.longitude,
  };

  if (!hotel) {
    return <p>Loading hotel details...</p>;
  }

  const { summary, propertyGallery, reviewInfo } = hotel;

  return (
    <div>
      <div className="hotel-content">
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
        <div className="map-container">
          <LoadScript googleMapsApiKey="AIzaSyCx19ymBXj2YWJkocIIBiapQHQmzXzFnSQ">
            <GoogleMap
              mapContainerStyle={{ width: "400px", height: "300px" }}
              center={defaultCenter}
              zoom={15}
              onLoad={(map) => setMap(map)}
            >
              <Marker position={defaultCenter} />
            </GoogleMap>
          </LoadScript>
        </div>
      </div>

      <nav className="details-nav">
        <ul>
          <li>
            <a href="#overview">Overview</a>
          </li>
          <li>
            <a href="#amenities">Amenities</a>
          </li>
        </ul>
      </nav>

      <section id="overview">
        <h1>{summary?.name}</h1>
        <button
          onClick={toggleSave}
          style={{ fontSize: "24px", color: isSaved ? "red" : "grey" }}
        >
          {isSaved ? "♥" : "♡"}
        </button>
        <div className="rating">
          {[1, 2, 3, 4, 5].map((star) => (
            <span
              key={star}
              onClick={() => handleRating(star)}
              className={rating >= star ? "filled" : ""}
            >
              ☆
            </span>
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
          <span className="score">
            {
              reviewInfo?.summary?.overallScoreWithDescriptionA11y?.value.split(
                "/"
              )[0]
            }
          </span>
          <span className="description">
            {
              reviewInfo?.summary?.overallScoreWithDescriptionA11y?.value.split(
                "10"
              )[1]
            }
          </span>
        </div>
      </section>

      <section id="amenities">
        <h2>Popular amenities</h2>
        <div className="amenities-container">
          {summary?.amenities?.topAmenities?.items.map((amenity, index) => (
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
