import { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import _ from 'lodash';

const Hotel = () => {
    const [hotel, setHotel] = useState(null);
    const lastHotelData = useRef();  // Store the last hotel data
    const { id } = useParams();

    useEffect(() => {
        const fetchHotelDetails = async () => {
            const res = await axios.get('/api/hotelDetails/', { params: { hotel_id: id } });
            if (!_.isEqual(lastHotelData.current, res.data)) {
                setHotel(res.data);
                lastHotelData.current = res.data;  // Update the ref
            }
        };
        fetchHotelDetails();
    }, [id]); // Dependency array with only id ensures useEffect runs only when id changes

    return (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
            {hotel ? (
                <>
                    <h1>{hotel.summary?.name}</h1>
                    <img src={hotel.propertyGallery?.images?.[0]?.image?.url} alt={hotel.summary?.name} />
                </>
            ) : <p>Loading hotel details...</p>}
        </div>
    );
};

if (process.env.NODE_ENV === 'development') {
    Hotel.whyDidYouRender = true;
}

export default Hotel;