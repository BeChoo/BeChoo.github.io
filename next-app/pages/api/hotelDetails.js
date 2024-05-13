const axios = require('axios');

// Function responsible for handling requests to fetch detailed hotel data
export default async function handler(req, res) {
    const { hotel_id, domain = 'AE', locale = 'en_GB' } = req.query;

    const options = {
        method: 'GET',
        url: 'https://hotels-com-provider.p.rapidapi.com/v2/hotels/details',
        params: { domain, hotel_id, locale },
        headers: {
            'X-RapidAPI-Key': '55be8b6ed7mshd007e3fe20ca075p134d06jsn19e62b391381',
            'X-RapidAPI-Host': 'hotels-com-provider.p.rapidapi.com'
        }
    };

    try {
        const response = await axios.request(options);
        res.status(200).json(response.data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error fetching hotel details" });
    }
}