import axios from 'axios';

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
            'X-RapidAPI-Key': '55be8b6ed7mshd007e3fe20ca075p134d06jsn19e62b391381',
            'X-RapidAPI-Host': 'hotels-com-provider.p.rapidapi.com'
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