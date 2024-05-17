import axios from "axios";
import Cors from 'cors';

const cors = Cors({
  methods: ['GET', 'HEAD', 'POST', 'OPTIONS'],
  origin: ['https://gotel-frontend-eight.vercel.app', 'https://gotel-frontend-gotel.vercel.app', 'https://gotel-frontend-git-main-gotel.vercel.app'],
  optionsSuccessStatus: 200
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
      "x-rapidapi-key": '1b2041a76cmsh2091ed3aa3a8d77p1136fcjsn879b406a44d0'
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
    res.status(500).json({ error: "Internal Server Error" });
  }
}
