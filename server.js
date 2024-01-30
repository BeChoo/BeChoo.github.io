const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
mongoose.connect();

// Create a Hotel model
const Hotel = mongoose.model('Hotel', {
  name: String,
  location: String,
  price: Number,
});

// Middleware
app.use(bodyParser.json());

// API endpoint to get a list of hotels
app.get('/api/hotels', async (req, res) => {
  try {
    const hotels = await Hotel.find();
    res.json(hotels);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Serve static files (React build) in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('frontend/build'));
}

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
