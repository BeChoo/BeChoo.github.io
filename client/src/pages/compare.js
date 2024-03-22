// Importing necessary modules from React and React Router
import React, { useState } from "react";
import { Link } from 'react-router-dom'; // Importing Link component for navigation
import './compare.css'; // Importing custom styles for Compare component
import hotelSchemas from '../data/hotelData'; // Importing hotelSchemas from the specified file path

// Functional component for comparing hotels
const Compare = () => {
    // State to manage the indices of currently displayed hotels for each category
    const [currentHotelIndices, setCurrentHotelIndices] = useState([0, 0]);

    // Function to navigate to the next hotel in a category
    const navigateNext = (contentIndex) => {
        setCurrentHotelIndices(prevIndices => {
            const updatedIndices = [...prevIndices];
            updatedIndices[contentIndex] = (updatedIndices[contentIndex] + 1) % hotelSchemas[contentIndex].length;
            return updatedIndices;
        });
    };

    // Function to navigate to the previous hotel in a category
    const navigatePrevious = (contentIndex) => {
        setCurrentHotelIndices(prevIndices => {
            const updatedIndices = [...prevIndices];
            updatedIndices[contentIndex] = (updatedIndices[contentIndex] - 1 + hotelSchemas[contentIndex].length) % hotelSchemas[contentIndex].length;
            return updatedIndices;
        });
    };

    // Function to determine arrow icons based on rating and price comparison between two hotels
    const getArrowIcon = (currentRating, otherRating, currentPrice, otherPrice) => {
        let ratingArrow = "";
        let priceArrow = "";
        if (currentRating > otherRating) {
            ratingArrow = <span className="rating-arrow up">&#8593;</span>;
        } else if (currentRating < otherRating) {
            ratingArrow = <span className="rating-arrow down">&#8595;</span>;
        }

        if (currentPrice > otherPrice) {
            priceArrow = <span className="rating-arrow up">&#8593;</span>;
        } else if (currentPrice < otherPrice) {
            priceArrow = <span className="rating-arrow down">&#8595;</span>;
        }

        return { ratingArrow, priceArrow };
    };

    // Rendering the Compare component
    return (
        <div>
            <h1 className="title">
                Compare Hotels
            </h1>
            <div className="row">
                {/* Mapping through hotelSchemas array to display each category of hotels */}
                {hotelSchemas.map((hotels, index) => (
                    <div key={index} className="content">
                        {/* Button to navigate to the previous hotel */}
                        <p onClick={() => navigatePrevious(index)}>Previous Hotel <i className="arrow left"></i></p>
                        {/* Link to the detail page of the currently displayed hotel */}
                        <Link to={`/hotel/${hotels[currentHotelIndices[index]].id}`}>
                            <img src={hotels[currentHotelIndices[index]].image} alt={hotels[currentHotelIndices[index]].name} />
                        </Link>
                        {/* Button to navigate to the next hotel */}
                        <p onClick={() => navigateNext(index)}>Next Hotel <i className="arrow right"></i></p>
                        {/* Displaying hotel information */}
                        <div className="hotel-info">
                            <p>Name: {hotels[currentHotelIndices[index]].name}</p>
                            <p>
                                Rating: {hotels[currentHotelIndices[index]].rating}
                                {/* Displaying arrow icon indicating rating comparison */}
                                {getArrowIcon(
                                    hotels[currentHotelIndices[index]].rating,
                                    hotelSchemas[(index + 1) % hotelSchemas.length][currentHotelIndices[(index + 1) % hotelSchemas.length]].rating,
                                    hotels[currentHotelIndices[index]].priceAverage,
                                    hotelSchemas[(index + 1) % hotelSchemas.length][currentHotelIndices[(index + 1) % hotelSchemas.length]].priceAverage
                                ).ratingArrow}
                            </p>
                            <p>
                                Average Price: ${hotels[currentHotelIndices[index]].priceAverage}
                                {/* Displaying arrow icon indicating price comparison */}
                                {getArrowIcon(
                                    hotels[currentHotelIndices[index]].rating,
                                    hotelSchemas[(index + 1) % hotelSchemas.length][currentHotelIndices[(index + 1) % hotelSchemas.length]].rating,
                                    hotels[currentHotelIndices[index]].priceAverage,
                                    hotelSchemas[(index + 1) % hotelSchemas.length][currentHotelIndices[(index + 1) % hotelSchemas.length]].priceAverage
                                ).priceArrow}
                            </p>
                            <p>Location: {hotels[currentHotelIndices[index]].location}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
 
// Exporting the Compare component
export default Compare;