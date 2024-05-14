import React, { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import axios from "axios";
import { useUser } from "./UserContext"; // Ensure path to UserContext is correct
import "./Hotel.css"; // Ensure path to CSS is correct
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const Hotel = () => {
  const [hotel, setHotel] = useState(null);
  const [offers, setOffers] = useState(null);
  const [rating, setRating] = useState(null);
  const [reviewText, setReviewText] = useState("");
  const [isSaved, setIsSaved] = useState(false);
  const { user, addReview, updateSavedHotels } = useUser();
  const [map, setMap] = useState(null);
  const [nearbyPOIs, setNearbyPOIs] = useState([]);
  const { id } = useParams();
  const location = useLocation();
  // Fallback to empty object if state is undefined

  const { checkIn, checkOut, adults } =
    JSON.parse(localStorage.getItem("hotelParams")) || {};

  useEffect(() => {
    const fetchHotelDetails = async () => {
      try {
        const url = `https://gotel-api-gotel.vercel.app/api/hotelDetails?hotel_id=${id}`;
        const response = await axios.get(url);
        setHotel(response.data);
        setNearbyPOIs(response.data.summary.nearbyPOIs.items);
        const alreadySaved = user?.savedHotels.some(
          (hotel) => hotel.hotelId === id
        );
        setIsSaved(alreadySaved);
      } catch (error) {
        console.error("Error fetching hotel details:", error);
      }
    };
    fetchHotelDetails();

    if (id && checkIn && checkOut && adults) {
      fetchHotelOffers(id, checkIn, checkOut, adults);
    }
  }, [id, user?.savedHotels, checkIn, checkOut, adults]);

  const fetchHotelOffers = async (
    hotelId,
    checkInDate,
    checkOutDate,
    adultsNumber
  ) => {
    try {
      const response = await axios.get(
        "https://gotel-frontend-git-main-gotel.vercel.app/api/hotelOffers",
        {
          params: {
            hotelId,
            checkIn: checkInDate,
            checkOut: checkOutDate,
            adults: adultsNumber,
          },
        }
      );
      if (response.data && response.data.categorizedListings.length > 0) {
        setOffers(response.data);
      } else {
        throw new Error("No rooms available"); // Throws if no data
      }
    } catch (error) {
      console.error("Failed to fetch hotel offers:", error);
      setOffers(null); // Set offers to null to trigger the error message
    }
  };

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
  }, [hotel, map]);

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
        "https://gotel-api.vercel.app//submitReview",
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
        `https://gotel-api.vercel.app/${action}`,
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

  const aboutThisProperty =
    hotel.propertyContentSectionGroups?.aboutThisProperty?.sections[0];

  const propertyAmenities = hotel.summary.amenities.amenities.find(
    (amenity) => amenity.title === "Property amenities"
  );
  const roomServiceAmenity = propertyAmenities?.contents.find(
    (content) => content.icon.id === "room_service"
  );

  const renderRoomDetails = (listing) => {
    if (
      !listing ||
      !listing.primarySelections ||
      !listing.primarySelections[0]
    ) {
      console.log("Incomplete listing data:", listing);
      return "No data available for this listing.";
    }

    const primarySelection = listing.primarySelections[0];
    const unitGallery = primarySelection.propertyUnit?.unitGallery;
    const gallery = unitGallery?.gallery;
    const image =
      gallery && gallery.length > 0
        ? gallery[0].image.url
        : "default-image-url";
    const header = listing.header?.text || "No title available";
    const features = primarySelection.propertyUnit?.features
      ?.slice(0, 4)
      .map((feature, idx) => feature?.text) || ["No feature info"];
    const specialOffer =
      listing.highlightedMessages && listing.highlightedMessages.length > 0
        ? listing.highlightedMessages[0].trigger.value
        : "No special offers";
    const ratePlan =
      primarySelection.propertyUnit?.ratePlans &&
      primarySelection.propertyUnit.ratePlans.length > 0
        ? primarySelection.propertyUnit.ratePlans[0]
        : null;
    const priceDetails = ratePlan?.priceDetails[0]?.price?.displayMessages;
    const priceFormatted =
      priceDetails && priceDetails.length > 0
        ? priceDetails[0].lineItems[0].price.formatted
        : "No pricing available";
    const totalPrice =
      priceDetails && priceDetails.length > 1
        ? priceDetails[1].lineItems[0].value
        : "N/A";
    const priceDetailText =
      priceDetails && priceDetails.length > 2
        ? priceDetails[2].lineItems[0].value
        : "N/A";

    return (
      <div
        className="room-container"
        style={{ backgroundColor: "white", padding: "20px", margin: "10px 0" }}
      >
        <img src={image} alt="Room Image" style={{ width: "100%" }} />
        <h3>{header}</h3>
        <ul>
          {features.map((featureText, idx) => (
            <li key={idx}>{featureText}</li>
          ))}
        </ul>
        <p style={{ color: "green", fontWeight: "bold" }}>{specialOffer}</p>
        <hr style={{ borderColor: "grey" }} />
        <p style={{ fontWeight: "bold" }}>{priceFormatted}</p>
        <p>{totalPrice}</p>
        <p>Price details: {priceDetailText}</p>
      </div>
    );
  };

  console.log("Offers Data:", offers);
  return (
    <div className="hotel-container">
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
      </div>
      <nav className="details-nav">
        <ul>
          <li>
            <a href="#overview">Overview</a>
          </li>
          <li>
            <a href="#amenities">Amenities</a>
          </li>
          <li>
            <a href="#pricing">Pricing</a>
          </li>
          <li>
            <a href="#details">Details</a>
          </li>
          <li>
            <a href="#policies">Policies</a>
          </li>
        </ul>
      </nav>
      <section id="overview">
        <div className="overview-container">
          <div className="left-container">
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
          </div>
          <div className="map-container">
            <LoadScript googleMapsApiKey="AIzaSyCx19ymBXj2YWJkocIIBiapQHQmzXzFnSQ">
              <GoogleMap
                mapContainerStyle={{ width: "100%", height: "300px" }}
                center={defaultCenter}
                zoom={15}
                onLoad={(map) => setMap(map)}
              >
                <Marker position={defaultCenter} />
              </GoogleMap>
            </LoadScript>
          </div>
        </div>
      </section>
      <section id="amenities">
        <div className="overview-section">
          <div className="amenities-container">
            <div className="amenities-title">Popular amenities</div>
            <div className="amenities-list">
              {summary?.amenities?.topAmenities?.items.map((amenity, index) => (
                <div key={index} className="amenity">
                  <p>{amenity?.text}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="landmarks-container">
            <h2>Nearby Landmarks</h2>
            {nearbyPOIs.map((poi, index) => (
              <div key={index} className="landmark">
                <span className="landmark-name">{poi.text}</span>
                <span className="landmark-distance">{poi.moreInfo}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section id="pricing">
        <h2>Hotel Prices</h2>
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            margin: "20px 0",
          }}
        >
          <div className="date-box">Check-in: {checkIn}</div>
          <div className="date-box">Check-out: {checkOut}</div>
          <div className="date-box">
            Travelers: 1 room, {adults} traveler{adults > 1 ? "s" : ""}
          </div>
        </div>
        <div className="rooms-flex-container">
          {offers && offers.categorizedListings ? (
            offers.categorizedListings.map((listing, index) =>
              renderRoomDetails(listing)
            )
          ) : (
            <p>There are no available rooms at this date.</p>
          )}
        </div>
      </section>
      <section id="details">
        <h2>About this Property</h2>
        {aboutThisProperty?.bodySubSections.find(
          (subSection) =>
            subSection?.elements[0]?.header?.text === summary?.name
        ) && (
          <>
            <h3 style={{ fontWeight: "bold" }}>
              {
                aboutThisProperty.bodySubSections.find(
                  (subSection) =>
                    subSection?.elements[0]?.header?.text === summary?.name
                ).elements[0].header.text
              }
            </h3>
            <p>
              {
                aboutThisProperty.bodySubSections.find(
                  (subSection) =>
                    subSection?.elements[0]?.header?.text === summary?.name
                ).elements[0].items[0].content.text
              }
            </p>
          </>
        )}
        {aboutThisProperty?.bodySubSections.find(
          (subSection) => subSection?.elements[0]?.header?.text === "Languages "
        ) && (
          <>
            <h3 style={{ fontWeight: "bold" }}>
              {
                aboutThisProperty.bodySubSections.find(
                  (subSection) =>
                    subSection?.elements[0]?.header?.text === "Languages "
                ).elements[0].header.text
              }
            </h3>
            <p>
              {
                aboutThisProperty.bodySubSections.find(
                  (subSection) =>
                    subSection?.elements[0]?.header?.text === "Languages "
                ).elements[0].items[0].content.primary.value
              }
            </p>
          </>
        )}
        <h3 style={{ fontWeight: "bold" }}>Services</h3>
        <ul>
          <div className="services-container">
            {roomServiceAmenity?.items.slice(0, 6).map((item, index) => (
              <div key={index} className="service-item">
                <span>• {item.text}</span>
              </div>
            ))}
          </div>
        </ul>
        <section className="unique-to-location">
          <h3 style={{ fontWeight: "bold" }}>Unique to Location</h3>
          <p>{hotel?.summary?.location?.whatsAround?.editorial?.content[0]}</p>
        </section>
      </section>
      <section id="policies" className="policies-section">
        <h3 style={{ fontWeight: "bold", fontSize: "larger" }}>Policies</h3>
        <div className="policies-list">
          {hotel?.summary?.policies?.needToKnow?.body.map((policy, index) => (
            <p key={index}>{policy}</p>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Hotel;
