// Importing required modules
const express = require("express"); // Importing Express framework
const cors = require("cors"); // Importing CORS middleware

// Creating an Express application
const app = express();

// Middleware setup
app.use(express.json()); // Parse incoming JSON requests
app.use(cors({ origin: true })); // Enable CORS with origin true

// POST route for authentication
app.post("/authenticate", async (req, res) => {
  const { username } = req.body; // Extract username from request body

  try {
    // Sending a PUT request to ChatEngine API for user authentication
    const r = await axios.put(
      "https://api.chatengine.io/users/",
        {username: username, secret: username, first_name: username},
        {headers: {"private-key":  "41328c1f-6596-4faa-b026-437be6818e7" }}
    );
    return res.status(r.status).json(r.data); // Sending response with data from ChatEngine API
  } catch (e) {
    // Handling errors
    return res.status(e.response.status).json(e.response.data); // Sending error response
  }
});

// Starting the server on port 3001
app.listen(3001, () => {
  console.log("Server is running on port 3001");
});