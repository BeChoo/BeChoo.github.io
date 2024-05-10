import React, { useEffect, useState } from 'react';

function CompareHotels() {
    const [hotels, setHotels] = useState([]);

    useEffect(() => {
        const loadedHotels = localStorage.getItem('compareHotels');
        if (loadedHotels) {
            setHotels(JSON.parse(loadedHotels));
            // Optionally clear the item from storage if it's no longer needed
            localStorage.removeItem('compareHotels');
        }
    }, []);

    // Check if two hotels are provided
    if (hotels.length !== 2) {
        return <div>Invalid hotel data provided for comparison.</div>;
    }

    const [hotel1, hotel2] = hotels;

    // Helper to determine which value is higher for applying styles
    const compareValue = (value1, value2) => {
        if (value1 > value2) return { winner: 1, loser: 2 };
        if (value1 < value2) return { winner: 2, loser: 1 };
        return { winner: 0, loser: 0 };
    };

    // Compare ratings and prices
    const ratingComparison = compareValue(hotel1.reviews?.score, hotel2.reviews?.score);
    const priceComparison = compareValue(
        parseFloat(hotel1.price.options[0]?.formattedDisplayPrice.replace(/[$,]/g, '')),
        parseFloat(hotel2.price.options[0]?.formattedDisplayPrice.replace(/[$,]/g, ''))
    );
    const reviewCountComparison = compareValue(hotel1.reviews?.total, hotel2.reviews?.total);

    return (
        <div style={{ display: 'flex', justifyContent: 'center', margin: '20px' }}>
            <div style={{ marginRight: '50px' }}>
                <img src={hotel1.propertyImage.image.url} alt={hotel1.name} style={{ width: '300px' }} />
                <p>Hotel: {hotel1.name}</p>
                <p>Rating: {hotel1.reviews?.score} {ratingComparison.winner === 1 ? '↑' : ratingComparison.loser === 1 ? '↓' : ''}</p>
                <p>Rating Count: {hotel1.reviews?.total} {reviewCountComparison.winner === 1 ? '↑' : reviewCountComparison.loser === 1 ? '↓' : ''}</p>
                <p>Average Price: {hotel1.price.options[0]?.formattedDisplayPrice} {priceComparison.winner === 1 ? '↓' : priceComparison.loser === 1 ? '↑' : ''}</p>
                <p>Location: {hotel1.neighborhood?.name}</p>
            </div>
            <div>
                <img src={hotel2.propertyImage.image.url} alt={hotel2.name} style={{ width: '300px' }} />
                <p>Hotel: {hotel2.name}</p>
                <p>Rating: {hotel2.reviews?.score} {ratingComparison.winner === 2 ? '↑' : ratingComparison.loser === 2 ? '↓' : ''}</p>
                <p>Rating Count: {hotel2.reviews?.total} {reviewCountComparison.winner === 2 ? '↑' : reviewCountComparison.loser === 2 ? '↓' : ''}</p>
                <p>Average Price: {hotel2.price.options[0]?.formattedDisplayPrice} {priceComparison.winner === 2 ? '↓' : priceComparison.loser === 2 ? '↑' : ''}</p>
                <p>Location: {hotel2.neighborhood?.name}</p>
            </div>
        </div>
    );
    
}

export default CompareHotels;
