require('dotenv').config();
const cors = require("cors");
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const axios = require('axios');
const { UserModel, ReviewModel } = require('./models/User');
const bcrypt = require('bcrypt');

const corsOptions = {
  origin: ['https://gotel-frontend-eight.vercel.app', 'https://gotel-frontend-gotel.vercel.app', 'https://gotel-frontend-git-main-gotel.vercel.app'],
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));
app.use(express.json());

// Keep as process.env
mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((err) => {
    console.error("Connection failed", err);
  });

app.options('*', cors());

app.get("/", (req, res) => res.send("Express on Vercel"));

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  UserModel.findOne({ email })
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        res.json({ message: "Success", user });
      } else {
        res.status(401).json({ message: "Invalid credentials" });
      }
    })
    .catch(err => {
      console.error("Login error:", err);
      res.status(500).json({ error: "Error logging in", details: err.toString() });
    });
});

app.post("/register", async (req, res) => {
  const hashedPassword = await bcrypt.hash(req.body.password, 10);
  const user = { ...req.body, password: hashedPassword };
  UserModel.create(user)
    .then(user => res.json(user))
    .catch(err => res.status(500).json(err));
});

// Submit a review
app.post('/submitReview', (req, res) => {
  const { userId, hotelId, hotelName, hotelImageURL, rating, reviewText } = req.body;
  console.log("Submitting review for user:", userId);
  console.log("Review details:", { hotelId, hotelName, hotelImageURL, rating, reviewText });

  UserModel.findByIdAndUpdate(
    userId,
    { $push: { reviews: { hotelId, hotelName, hotelImageURL, rating, reviewText } } },
    { new: true, safe: true, upsert: true }
  )
    .then(user => {
      console.log("Review added successfully:", user);
      res.status(200).json({ review: { hotelId, hotelName, hotelImageURL, rating, reviewText } });
    })
    .catch(err => {
      console.error("Error submitting review:", err);
      res.status(500).json({ error: "Error submitting review", details: err });
    });
});

app.post('/updateProfilePic', (req, res) => {
  const { userId, profilePic } = req.body;
  UserModel.findByIdAndUpdate(
    userId,
    { $set: { profilePic: profilePic } },
    { new: true }
  )
    .then(user => res.status(200).json({ message: "Profile picture updated", profilePic: user.profilePic }))
    .catch(err => res.status(500).json({ error: "Error updating profile picture", details: err }));
});

// Get reviews by a user
app.get('/userReviews/:userId', (req, res) => {
  const userId = req.params.userId;
  //console.log("Fetching reviews for user ID:", userId);
  UserModel.findById(userId)
    .populate('reviews')  // Ensure 'reviews' refers to a valid path if it’s supposed to be a populated field
    .then(user => {
      if (user && user.reviews) {
        //console.log("Reviews found:", user.reviews);
        res.status(200).json(user.reviews);
      } else {
        //console.log("No user or reviews found for ID:", userId);
        res.status(404).json({ message: "User not found or no reviews" });
      }
    })
    .catch(err => {
      console.error("Error fetching reviews for user ID:", userId, err);
      res.status(500).json({ error: "Error fetching reviews", details: err });
    });
});

app.post('/saveHotel', (req, res) => {
  const { userId, hotelId, hotelName } = req.body;
  UserModel.findByIdAndUpdate(
    userId,
    { $addToSet: { savedHotels: { hotelId, hotelName } } },
    { new: true }
  )
    .then(user => res.status(200).json(user.savedHotels))
    .catch(err => res.status(500).json({ error: "Error saving hotel", details: err }));
});

app.post('/unsaveHotel', (req, res) => {
  const { userId, hotelId } = req.body;
  UserModel.findByIdAndUpdate(
    userId,
    { $pull: { savedHotels: { hotelId } } },
    { new: true }
  )
    .then(user => res.status(200).json(user.savedHotels))
    .catch(err => res.status(500).json({ error: "Error unsaving hotel", details: err }));
});

app.get('/api/hotelDetails/:hotelId', async (req, res) => {
  const { hotelId } = req.params;
  console.log("Fetching details for hotel ID:", hotelId);
  try {
    const response = await axios.get(`https://gotel-frontend-eight.vercel.app/hotelDetails?hotel_id=${hotelId}`);
    console.log("Hotel details fetched successfully:", response.data);
    res.json(response.data);
  } catch (error) {
    console.error('Failed to fetch hotel details:', error);
    res.status(404).json({ message: "Hotel details not found" });
  }
});

// Comment out when pushing to prod
// const port = process.env.PORT || 3002;
// app.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
// });

module.exports = app;
