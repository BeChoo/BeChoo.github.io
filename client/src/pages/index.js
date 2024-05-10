import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./index.css";
import Hyatt from "../images/Hyatt.png";
import QueenMary from "../images/Queen Mary.png";
import Renaissance from "../images/Renaissance.png";
import Residence from "../images/Residence Inn.png";

const GOOGLE_API_KEY = 'AIzaSyCx19ymBXj2YWJkocIIBiapQHQmzXzFnSQ';
const GOOGLE_GEOCODING_URL = `https://maps.googleapis.com/maps/api/geocode/json`;

const fetchCityName = async (latitude, longitude) => {
    try {
        const response = await axios.get(GOOGLE_GEOCODING_URL, {
            params: {
                latlng: `${latitude},${longitude}`,
                key: GOOGLE_API_KEY
            }
        });
        const results = response.data.results;
        if (results.length > 0) {
            const cityObj = results[0].address_components.find(comp => comp.types.includes('locality'));
            return cityObj ? cityObj.long_name : null;
        }
        return null;
    } catch (error) {
        console.error('Failed to fetch city name', error);
        return null;
    }
};

const Home = () => {
    const [userLocation, setUserLocation] = useState(null);
    const [hotels, setHotels] = useState([]);
    const [visibleIndex, setVisibleIndex] = useState(0);

    const getLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(showPosition, handleError);
        } else {
            alert("Geolocation is not supported by this browser.");
        }
    };

    const showPosition = async (position) => {
        const { latitude, longitude } = position.coords;
        setUserLocation({ latitude, longitude });
        const cityName = await fetchCityName(latitude, longitude);
        if (cityName) getLocalHotels(cityName);
    };

    const handleError = (error) => {
        console.warn(`ERROR(${error.code}): ${error.message}`);
    };

    useEffect(() => {
        getLocation();
    }, []);

    const getLocalHotels = async (cityName) => {
        const cityResponse = await axios.get('/api/city/', { params: { searchCity: cityName } });
        const cityId = cityResponse.data.data[0].gaiaId;
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        const checkOutDate = new Date();
        checkOutDate.setDate(tomorrow.getDate() + 2);

        const hotelResponse = await axios.get('/api/hotels/', {
            params: {
                city: cityId,
                checkIn: tomorrow.toISOString().split('T')[0],
                checkOut: checkOutDate.toISOString().split('T')[0],
                guests: 1
            }
        });
        setHotels(hotelResponse.data.properties.sort((a, b) => b.reviews?.total - a.reviews?.total).slice(0, 18));
    };

    const handleSlide = (direction) => {
        if (direction === 'next' && visibleIndex < Math.ceil(hotels.length / 3) - 1) {
            setVisibleIndex(visibleIndex + 1);
        } else if (direction === 'prev' && visibleIndex > 0) {
            setVisibleIndex(visibleIndex - 1);
        }
    };

    return (
        <div>
            <h1 style={{ textAlign: "center" }}>Welcome to Gotel!</h1>
            <div className="centered-content">
                <div className="image-container"><img src={Hyatt} alt="Hyatt" /></div>
                <div className="image-container"><img src={QueenMary} alt="Queen Mary" /></div>
                <div className="image-container"><img src={Renaissance} alt="Renaissance" /></div>
                <div className="image-container"><img src={Residence} alt="Residence Inn" /></div>
            </div>
            <div style={{ textAlign: "center", marginTop: "50px" }}>
                <h2>Hotel of the Day!</h2>
                <h3>Kawada Hotel</h3>
                <img src="https://example.com/kawada.jpg" alt="Kawada Hotel" style={{ width: "300px", height: "200px" }} />
                <p style={{ fontSize: "12px", marginTop: "10px" }}>Based on your location and limited time offers</p>
                <p style={{ fontSize: "20px", marginTop: "10px" }}>★★★</p>
            </div>
            {hotels.length > 0 && (
                <div>
                    <h2 style={{ textAlign: "center" }}>Popular Hotels Near You</h2>
                    <div className="hotel-carousel">
                        {hotels.slice(visibleIndex * 3, visibleIndex * 3 + 3).map(hotel => (
                            <div key={hotel.id} className="hotel-card">
                                <img src={hotel.propertyImage.image.url} alt={hotel.name} />
                                <div className="hotel-info">
                                <div className="hotel-name" style={{ fontSize: '16px', fontWeight: 'bold', overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis', marginTop: '20px', textAlign: 'center' }}>
            {hotel.name}
        </div>
                                    <div className="hotel-location">{hotel.neighborhood?.name || 'Location not available'}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="carousel-controls">
                        <button onClick={() => handleSlide('prev')} disabled={visibleIndex === 0}>Previous</button>
                        <button onClick={() => handleSlide('next')} disabled={visibleIndex >= Math.ceil(hotels.length / 3) - 1}>Next</button>
                    </div>
                </div>
            )}
            {hotels.length === 0 && (
    <div style={{ textAlign: "center" }}>
        <button onClick={getLocation}>View Trending Hotels at Your Location</button>
    </div>
)}
        </div>
    );
};

export default Home;
