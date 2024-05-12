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
            'X-RapidAPI-Key': 'cc2d0ee1c5msh5a5d341f07343edp1b881fjsn81db735615cf',
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