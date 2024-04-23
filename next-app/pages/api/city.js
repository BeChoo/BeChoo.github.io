import axios from "axios";
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
      "x-rapidapi-key": 'cc2d0ee1c5msh5a5d341f07343edp1b881fjsn81db735615cf',
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
