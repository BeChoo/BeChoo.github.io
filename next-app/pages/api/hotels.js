const axios = require('axios');
import Cors from 'cors';

const cors = Cors({
  methods: ['GET', 'HEAD', 'POST', 'OPTIONS'],
  origin: ['https://gotel-frontend-eight.vercel.app', 'https://gotel-frontend-gotel.vercel.app', 'https://gotel-frontend-git-main-gotel.vercel.app'],
  optionsSuccessStatus: 200
});

//Function responsible for handling requests coming from API
export default async function handler(req, res) {
  //RapidAPI endpoint configurations that hold all standard input options for gathering hotel data
  const options = {
    method: 'GET',
    url: 'https://hotels-com-provider.p.rapidapi.com/v2/hotels/search',
    params: {

      region_id: req.query.city,
      // locale: 'en_GB',
      // checkin_date: req.query.checkIn,
      // sort_order: 'REVIEW',
      // adults_number: req.query.guests,
      // domain: 'AE',
      // checkout_date: req.query.checkOut,
      // children_ages: '4,0,15',
      // lodging_type: 'HOTEL,HOSTEL,APART_HOTEL',
      // price_min: '10',
      // star_rating_ids: '3,4,5',
      // meal_plan: 'FREE_BREAKFAST',
      // page_number: '1',
      // price_max: '500',
      // amenities: 'WIFI,PARKING',
      // payment_type: 'PAY_LATER,FREE_CANCELLATION',
      // guest_rating_min: '8',
      // available_filter: 'SHOW_AVAILABLE_ONLY'
    },
    headers: {
      //RapidAPI key and host authentification 
      'X-RapidAPI-Key': '55be8b6ed7mshd007e3fe20ca075p134d06jsn19e62b391381',
      'X-RapidAPI-Host': 'hotels-com-provider.p.rapidapi.com'
    }
  };

  try {
    //Sends http rqeuest with the above configuration
    const response = await axios.request(options);
    //Sends a successful response with the data received from API
    res.status(200).json(response.data);
  } catch (error) {
    //Error handling in the event the response is not successful 
    console.error(error);
    res.status(500).json({ error: "Error" });
  }
}
