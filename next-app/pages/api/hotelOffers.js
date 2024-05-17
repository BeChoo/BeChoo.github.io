import axios from 'axios';
import Cors from 'cors';

const cors = Cors({
    methods: ['GET', 'HEAD', 'POST', 'OPTIONS'],
    origin: ['https://gotel-frontend-eight.vercel.app', 'https://gotel-frontend-gotel.vercel.app', 'https://gotel-frontend-git-main-gotel.vercel.app'],
    optionsSuccessStatus: 200
});

export default async function handler(req, res) {
    const { hotelId, checkIn, checkOut, adults } = req.query;

    const options = {
        method: 'GET',
        url: 'https://hotels-com-provider.p.rapidapi.com/v2/hotels/offers',
        params: {
            hotel_id: hotelId,
            checkin_date: checkIn,
            checkout_date: checkOut,
            adults_number: adults,
            locale: 'en_GB',
            domain: 'AE',
        },
        headers: {
            "x-rapidapi-host": "hotels-com-provider.p.rapidapi.com",
            "x-rapidapi-key": '1b2041a76cmsh2091ed3aa3a8d77p1136fcjsn879b406a44d0'
        }
    };

    try {
        const response = await axios.request(options);
        res.status(200).json(response.data);
    } catch (error) {
        console.error('API request failed:', error);
        res.status(500).json({ message: 'Failed to fetch hotel offers', error });
    }
}
