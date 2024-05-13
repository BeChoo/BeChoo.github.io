import axios from 'axios';
import Cors from 'cors';

// Initialize CORS middleware with your specific allowed origins
const cors = Cors({
  methods: ['GET', 'HEAD', 'POST', 'OPTIONS'],
  origin: [
    'https://gotel-frontend-eight.vercel.app', 
    'https://gotel-frontend-gotel.vercel.app', 
    'https://gotel-frontend-git-main-gotel.vercel.app'
  ],
  optionsSuccessStatus: 200
});

// Helper function to apply CORS and other middleware
function runMiddleware(req, res, fn) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });
}

export default async function handler(req, res) {
  // Run CORS middleware first
  await runMiddleware(req, res, cors);

  // Define API request options to the external service
  const options = {
    method: 'GET',
    url: 'https://hotels-com-provider.p.rapidapi.com/v2/hotels/search',
    params: {
      region_id: req.query.city,
      locale: 'en_GB',
      checkin_date: req.query.checkIn,
      sort_order: 'REVIEW',
      adults_number: req.query.guests,
      domain: 'AE',
      checkout_date: req.query.checkOut,
      children_ages: '4,0,15',
      lodging_type: 'HOTEL,HOSTEL,APART_HOTEL',
      price_min: '10',
      star_rating_ids: '3,4,5',
      meal_plan: 'FREE_BREAKFAST',
      page_number: '1',
      price_max: '500',
      amenities: 'WIFI,PARKING',
      payment_type: 'PAY_LATER,FREE_CANCELLATION',
      guest_rating_min: '8',
      available_filter: 'SHOW_AVAILABLE_ONLY'
    },
    headers: {
      "x-rapidapi-host": "hotels-com-provider.p.rapidapi.com",
      "x-rapidapi-key": '55be8b6ed7mshd007e3fe20ca075p134d06jsn19e62b391381'
    }
  };

  try {
    const response = await axios.request(options);
    // Set CORS headers explicitly if needed, not typically necessary if cors middleware is configured
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.status(200).json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error" });
  }
}
