import React, { useState } from "react";
import './compare.css';
import Navbar from "../components/Navbar";
import hotelSchemas from '../data/hotelData'; // Import hotelSchemas from hotelData.js

const Compare = () => {
    const [currentHotelIndices, setCurrentHotelIndices] = useState([0, 0]);

    const navigateNext = (contentIndex) => {
        setCurrentHotelIndices(prevIndices => {
            const updatedIndices = [...prevIndices];
            updatedIndices[contentIndex] = (updatedIndices[contentIndex] + 1) % hotelSchemas[contentIndex].length;
            return updatedIndices;
        });
    };

    const navigatePrevious = (contentIndex) => {
        setCurrentHotelIndices(prevIndices => {
            const updatedIndices = [...prevIndices];
            updatedIndices[contentIndex] = (updatedIndices[contentIndex] - 1 + hotelSchemas[contentIndex].length) % hotelSchemas[contentIndex].length;
            return updatedIndices;
        });
    };

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

    return (
        <div>
            <Navbar />
            <h1 className="title">
                Compare Hotels
            </h1>
            <div className="row">
                {hotelSchemas.map((hotels, index) => (
                    <div key={index} className="content">
                        <p onClick={() => navigatePrevious(index)}>Previous Hotel <i className="arrow left"></i></p>
                        <img src={hotels[currentHotelIndices[index]].image} alt={hotels[currentHotelIndices[index]].name} />
                        <p onClick={() => navigateNext(index)}>Next Hotel <i className="arrow right"></i></p>
                        <div className="hotel-info">
                            <p>Name: {hotels[currentHotelIndices[index]].name}</p>
                            <p>
                                Rating: {hotels[currentHotelIndices[index]].rating}
                                {getArrowIcon(
                                    hotels[currentHotelIndices[index]].rating,
                                    hotelSchemas[(index + 1) % hotelSchemas.length][currentHotelIndices[(index + 1) % hotelSchemas.length]].rating,
                                    hotels[currentHotelIndices[index]].priceAverage,
                                    hotelSchemas[(index + 1) % hotelSchemas.length][currentHotelIndices[(index + 1) % hotelSchemas.length]].priceAverage
                                ).ratingArrow}
                            </p>
                            <p>
                                Average Price: ${hotels[currentHotelIndices[index]].priceAverage}
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
 
export default Compare;