const axios = require('axios');

//Function responsible for handling requests coming from API
export default async function handler(req, res) {
  //RapidAPI endpoint configurations that hold all standard input options for gathering hotel data
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
      //RapidAPI key and host authentification 
      'X-RapidAPI-Key': 'cc2d0ee1c5msh5a5d341f07343edp1b881fjsn81db735615cf',
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
