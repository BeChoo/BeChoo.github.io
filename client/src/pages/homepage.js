import axios from 'axios';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './homepage.css';

export default function Home() {
    //State variables that manage the information used in this page
    const [searchCity, setSearchCity] = useState(null); //manages the input value for the destination input entered by the user
    const [city, setCity] = useState(null);
    const [checkIn, setCheckIn] = useState(null);
    const [checkOut, setCheckOut] = useState(null);
    const [guests, setGuests] = useState(null);
    const [hotels, setHotels] = useState(null);
    const [sortedHotels, setSortedHotels] = useState(null);
    const [sortByPrice, setSortByPrice] = useState(null); 
    const [sortByScore, setSortByScore] = useState(null); 
    const [selectedHotels, setSelectedHotels] = useState([]);
    const navigate = useNavigate();

    const getRatingDescription = (score) => {
        if (!score) return 'N/A'; // Return 'N/A' if score is not available

        score = parseFloat(score); // Parse score to float
        if (score >= 0 && score <= 5) {
            return 'Bad';
        } else if (score > 5 && score <= 6) {
            return 'Okay';
        } else if (score > 6 && score <= 7) {
            return 'Decent';
        } else if (score > 7 && score <= 8) {
            return 'Good';
        } else if (score > 8 && score <= 9) {
            return 'Very Good';
        } else if (score > 9 && score <= 10) {
            return 'Excellent';
        } else {
            return 'N/A'; // Default to 'N/A' for invalid scores
        }
    };

    //Function to fetch city data
    const getCity = async () => {
        try {
            const res = await axios.get('/api/city/', {
                params: { searchCity }
            });
            const { data } = res;
            setCity(data.data[0].gaiaId); //Set the city ID using API get request
        } catch (error) {
            console.log(error);
        }
    };

    //Function to fetch hotel data
    const getHotels = async () => {
        try {
            const res = await axios.get('/api/hotels/', {
                params: { city, checkIn, checkOut, guests }
            });
            const { data } = res;
            setHotels(data.properties); //Set the fetched hotel data using API get request
        } catch (error) {
            console.log(error);
        }
    };

    const handleSelectHotel = (hotelId) => {
        const updatedSelection = selectedHotels.includes(hotelId)
            ? selectedHotels.filter(id => id !== hotelId)
            : [...selectedHotels, hotelId].slice(0, 2);

        setSelectedHotels(updatedSelection);
    };

    const handleCompareHotels = () => {
        if (selectedHotels.length === 2) {
            const hotelsToCompare = hotels.filter(hotel => selectedHotels.includes(hotel.id));
            // Store the data in local storage
            localStorage.setItem('compareHotels', JSON.stringify(hotelsToCompare));
            // Open a new tab
            window.open('/compare', '_blank');
        } else {
            alert('Please select exactly two hotels to compare.');
        }
    };


    const handleHotelClick = (hotelId, checkIn, checkOut, guests) => {
        // Store the data in local storage
        localStorage.setItem('hotelParams', JSON.stringify({ checkIn, checkOut, adults: guests }));
        // Open the new tab
        window.open(`/hotel/${hotelId}`, '_blank');
    }
    

    //Effect that sorts hotels based on price after rendering
    useEffect(() => {
        // Sorting hotels based on price
        if (hotels && sortByPrice) {
            const sorted = [...hotels];
            sorted.sort((a, b) => {
                const priceA = parseFloat(a.price.options[0]?.formattedDisplayPrice.replace(/[$,]/g, '')); //removes any fluff from the API data to properly sort price
                const priceB = parseFloat(b.price.options[0]?.formattedDisplayPrice.replace(/[$,]/g, ''));
                if (sortByPrice === 'asc') {
                    return priceA - priceB;
                } else {
                    return priceB - priceA;
                }
            });
            setSortedHotels(sorted); //Set sorted hotels if there is no sorting option selected
        } else if (hotels && !sortByPrice && !sortByScore) {
            setSortedHotels(hotels);
        }
    }, [hotels, sortByPrice, sortByScore]);

    //Effect that sorts hotels based on score after rendering
    useEffect(() => {
        // Sorting hotels based on reviews score
        if (hotels && sortByScore) {
            const sorted = [...hotels];
            sorted.sort((a, b) => {
                const scoreA = parseFloat(a.reviews?.score);
                const scoreB = parseFloat(b.reviews?.score);
                if (sortByScore === 'asc') {
                    return scoreB - scoreA;
                } else {
                    return scoreA - scoreB;
                }
            });
            setSortedHotels(sorted); //Set sorted hotels if there is no sorting option selected
        } else if (hotels && !sortByPrice && !sortByScore) {
            setSortedHotels(hotels);
        }
    }, [hotels, sortByScore, sortByPrice]);

    return (
        <div className="container">
            <h1 className="title">
                <span className="text-active">Gotel</span>
            </h1>
            <h2 className="subtitle">
                
            </h2>
            <div className="search-container">
                <input
                    type="text"
                    className="search-input"
                    placeholder="Enter your destination city"
                    onChange={e => {
                        setCity(null);
                        setSearchCity(e.target.value);
                    }}
                />
                <div className="button-container">
                    <button
                        className="search-button"
                        onClick={() => getCity()} // Call getCity() when clicked
                    >
                        Search
                    </button>
                </div>
            </div>
            {/* Handles the check in, check out, and user input requests */}
            {city && (
                <div className="date-container"> {/* New container for date and guests input */}
                <input
                    type="date"
                    className="date-input" 
                    onChange={e => setCheckIn(e.target.value)}
                />
                <input
                    type="date"
                    className="date-input" 
                    onChange={e => setCheckOut(e.target.value)}
                />
                <input
                    type="number"
                    className="guests-input" 
                    placeholder="Total guests"
                    onChange={e => setGuests(e.target.value)}
                />
                <button
                    className="find-hotels-button" 
                    onClick={() => getHotels()}
                >
                    Find Hotels
                </button>
            </div>
            )}
{sortedHotels && (
    <div className="hotel-container mt-6">
            <div className="flex items-center">
            <h3 className="text-secondary text-lg mr-4">Sort by:</h3>
            <button
                className={`sort-button px-4 py-2 rounded-md mr-4 ${sortByPrice === 'asc' ? 'bg-active text-white' : 'bg-primary text-active'}`}
                onClick={() => setSortByPrice(prevState => prevState === 'asc' ? null : 'asc')}
            >
                Price Low to High
            </button>
            <button
                className={`sort-button px-4 py-2 rounded-md ${sortByPrice === 'desc' ? 'bg-active text-white' : 'bg-primary text-active'}`}
                onClick={() => setSortByPrice(prevState => prevState === 'desc' ? null : 'desc')}
            >
                Price High to Low
            </button>
        </div>
        <div className="flex items-center mt-4">
            <h3 className="text-secondary text-lg mr-4">Sort by:</h3>
            <button
                className={`sort-button px-4 py-2 rounded-md mr-4 ${sortByScore === 'asc' ? 'bg-active text-white' : 'bg-primary text-active'}`}
                onClick={() => setSortByScore(prevState => prevState === 'asc' ? null : 'asc')}
            >
                Highest Rating
            </button>
            <button
                className={`sort-button px-4 py-2 rounded-md ${sortByScore === 'desc' ? 'bg-active text-white' : 'bg-primary text-active'}`}
                onClick={() => setSortByScore(prevState => prevState === 'desc' ? null : 'desc')}
            >
                Lowest Rating
            </button>
        </div>
        {sortedHotels.map(hotel => (
            <div key={hotel.id} className="hotel-item">
                 <input
                                type="checkbox"
                                checked={selectedHotels.includes(hotel.id)}
                                onChange={() => handleSelectHotel(hotel.id)}
                                disabled={selectedHotels.length >= 2 && !selectedHotels.includes(hotel.id)}
                            />
                <div className="hotel-info-container">
                    <div className="hotel-image-container">
                        <img
                            src={hotel.propertyImage.image.url}
                            alt={hotel.name}
                            className="hotel-image"
                        />
                    </div>
                    <div className="hotel-details">
    <h3 className="hotel-name">
    <a href={`#`} onClick={() => handleHotelClick(hotel.id, checkIn, checkOut, guests)} style={{ color: 'black', textDecoration: 'none' }}>
                                    {hotel.name}
                                </a>
    </h3>
    <div className="hotel-rating-container">
        <p className="hotel-rating">
            {hotel.reviews?.score || 'N/A'}
        </p>
        <p className="hotel-description" data-rating={getRatingDescription(hotel.reviews?.score)}>
            {/* Description will be added dynamically based on rating */}
        </p>
    </div>
    <p className="hotel-price">
        {hotel.price.options[0]?.formattedDisplayPrice}
    </p>
    <p className="hotel-discount">
        {hotel.offerBadge?.secondary?.text}
    </p>
</div>
                </div>
            </div>
        ))}
{selectedHotels.length === 2 && (
    <div style={{ position: 'fixed', bottom: 0, left: 0, right: 0, width: '100%', padding: '10px', backgroundColor: 'rgba(0, 0, 0, 0.5)', textAlign: 'center', boxShadow: '0px -2px 10px rgba(0,0,0,0.1)' }}>
        <button onClick={handleCompareHotels} style={{ padding: '10px 20px', fontSize: '16px', color: 'white', backgroundColor: '#007bff', border: 'none', borderRadius: '5px' }}>
            Compare Selected Hotels
        </button>
    </div>
)}
        </div>
        )}
    </div>
    );
}