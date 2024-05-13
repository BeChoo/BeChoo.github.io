import axios from 'axios';
import { useState, useEffect } from 'react';

export default function Home() {
    //State variables that manage the information used in this page
    const [searchCity, setSearchCity] = useState(null); //manages the input value for the destination input entered by the user
    //The remaining variables store various information such as the check in date
    const [city, setCity] = useState(null);
    const [checkIn, setCheckIn] = useState(null);
    const [checkOut, setCheckOut] = useState(null);
    const [guests, setGuests] = useState(null);
    const [hotels, setHotels] = useState(null);
    const [sortedHotels, setSortedHotels] = useState(null);
    const [sortByPrice, setSortByPrice] = useState(null);
    const [sortByScore, setSortByScore] = useState(null);

    //Function to fetch city data
    const getCity = async () => {
        try {
            const res = await axios.get('api/city/', {
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
            const res = await axios.get('api/hotels/', {
                params: { city, checkIn, checkOut, guests }
            });
            const { data } = res;
            setHotels(data.properties); //Set the fetched hotel data using API get request
        } catch (error) {
            console.log(error);
        }
    };

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
        <div className="flex flex-col md:px-12 px-0 relative bg-background font-raleway items-center min-h-screen">
            <h1 className="text-6xl text-primary font-bold mt-20">
                <span className="text-active">Gotel</span>
            </h1>
            <h2 className="text-active text-2xl mt-6">

            </h2>
            <div className="sm:mx-auto mt-20 justify-center sm:w-full sm:flex">
                <input
                    type="text"
                    className="block w-1/3 border border-transparent rounded-md px-5 py-3 text-base text-background shadow-sm focus:outline-none focus:border-transparent focus:ring-2 focus:ring-active"
                    placeholder="Enter your destination city"
                    onChange={e => {
                        setCity(null);
                        setSearchCity(e.target.value);
                    }}
                />
                <div className="mt-4 sm:mt-0 sm:ml-3">
                    <button
                        className="block w-full rounded-md px-5 py-3 bg-active text-base font-medium text-primary focus:outline-none focus:ring-2 focus:ring-primary sm:px-10"
                        onClick={() => getCity()} // Call getCity() when clicked
                    >
                        Search
                    </button>
                </div>
            </div>
            {/* Handles the check in, check out, and user input requests */}
            {city && (
                <div className="mt-10 w-full sm:mx-auto lg:mx-0">
                    <div className="md:grid md:grid-cols-6 gap-1 flex flex-col">
                        <div className="rounded-l-lg col-span-2 col-span-2 flex flex-col py-2 items-center bg-primary">
                            <label
                                htmlFor="check-in"
                                className="py-2 text-sm font-semibold uppercase"
                            >
                                Check-in
                            </label>
                            <input
                                id="startDate"
                                type="date"
                                onChange={e => setCheckIn(e.target.value)}
                            />
                        </div>
                        <div className="col-span-2 py-2 flex flex-col items-center bg-primary">
                            <label
                                htmlFor="check-out"
                                className="py-2 text-sm font-semibold uppercase"
                            >
                                Check-out
                            </label>
                            <input
                                id="check-out"
                                type="date"
                                onChange={e => setCheckOut(e.target.value)}
                            />
                        </div>
                        <div className="col-span-1 py-2 flex flex-col items-center bg-primary overflow-hidden">
                            <label
                                htmlFor="guests"
                                className="py-2 text-sm font-semibold uppercase"
                            >
                                Guests
                            </label>
                            <input
                                id="guests"
                                type="number"
                                placeholder="Total guests"
                                className=" text-center"
                                onChange={e => setGuests(e.target.value)}
                            />
                        </div>
                        <div className="col-span-1 bg-active hover:opacity-80 rounded-r-lg">
                            <button
                                type="submit"
                                className="w-full h-full md:py-0 py-4 text-primary font-bold break-words"
                                onClick={() => getHotels()} // Call getHotels() when clicked
                            >
                                Find Hotels
                            </button>
                        </div>
                    </div>
                </div>
            )}
            {sortedHotels && (
                <div className="mt-8">
                    <div className="flex items-center">
                        <h3 className="text-secondary text-lg mr-4">Sort by:</h3>
                        <button
                            className={`px-4 py-2 rounded-md mr-4 ${sortByPrice === 'asc' ? 'bg-active text-white' : 'bg-primary text-active'}`}
                            onClick={() => setSortByPrice(prevState => prevState === 'asc' ? null : 'asc')}
                        >
                            Price Low to High
                        </button>
                        <button
                            className={`px-4 py-2 rounded-md ${sortByPrice === 'desc' ? 'bg-active text-white' : 'bg-primary text-active'}`}
                            onClick={() => setSortByPrice(prevState => prevState === 'desc' ? null : 'desc')}
                        >
                            Price High to Low
                        </button>
                    </div>
                    <div className="flex items-center mt-4">
                        <h3 className="text-secondary text-lg mr-4">Sort by:</h3>
                        <button
                            className={`px-4 py-2 rounded-md mr-4 ${sortByScore === 'asc' ? 'bg-active text-white' : 'bg-primary text-active'}`}
                            onClick={() => setSortByScore(prevState => prevState === 'asc' ? null : 'asc')}
                        >
                            Highest Rating
                        </button>
                        <button
                            className={`px-4 py-2 rounded-md ${sortByScore === 'desc' ? 'bg-active text-white' : 'bg-primary text-active'}`}
                            onClick={() => setSortByScore(prevState => prevState === 'desc' ? null : 'desc')}
                        >
                            Lowest Rating
                        </button>
                    </div>
                    <div className="mt-6">
                        {sortedHotels.map(hotel => (
                            <div key={hotel.id} className="flex items-center justify-start mb-8">
                                <div className="mr-4">
                                    <img
                                        src={hotel.propertyImage.image.url}
                                        alt={hotel.name}
                                        className="w-64 h-40 object-cover rounded-lg"
                                    />
                                </div>
                                <div>
                                    {/* Outputs the hotel name */}
                                    <h3 className="text-lg font-medium" style={{ color: 'black' }}>
                                        {hotel.name}
                                    </h3>
                                    {/* Outputs the hotel rating */}
                                    <p className="text-sm text-gray-600 mb-4"> {/* Modify the text color here */}
                                        Rating: {hotel.reviews?.score || 'N/A'}
                                    </p>
                                    {/* Outputs the hotel price */}
                                    <p className="text-lg font-bold text-active">
                                        {hotel.price.options[0]?.formattedDisplayPrice}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
