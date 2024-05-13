import axios from "axios";
import Cors from 'cors';

const cors = Cors({
  methods: ['GET', 'HEAD'],
});

//Function responsible for handling requests coming from API
export default async function handler(req, res) {
  //RapidAPI endpoint configurations that hold all standard input options for gathering the region data
  const options = {
    method: "GET",
    url: "https://hotels-com-provider.p.rapidapi.com/v2/regions",
    params: {
      query: req.query.searchCity,
      domain: 'AE',
      locale: 'en_GB'
    },
    //RapidAPI key and host authentification 
    headers: {
      "x-rapidapi-host": "hotels-com-provider.p.rapidapi.com",
      "x-rapidapi-key": '55be8b6ed7mshd007e3fe20ca075p134d06jsn19e62b391381',
    },
  };
  try {
    //Sends http rqeuest with the above configuration
    const response = await axios.request(options);
    //Sends a successful response with the data received from API
    res.status(200).json(response.data);
  } catch (error) {
    //Error handling in the event the response is not successful 
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
