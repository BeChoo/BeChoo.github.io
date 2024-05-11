const express = require('express');
const mongoose = require('mongoose');
const cors = require("cors");
const { UserModel, ReviewModel } = require('./models/User');

const app = express();
app.use(express.json());
const corsOptions = {
  origin: 'https://gotel-api.vercel.app', // Allows requests only from your frontend
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

mongoose.connect("mongodb+srv://chasecalero:chasecalero@gotel.pkl54mr.mongodb.net/Gotel?retryWrites=true&w=majority")
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch(() => {
    console.log("Connection failed");
  });


app.post("/login", (req, res) => {
    const { email, password } = req.body;
    UserModel.findOne({ email: email })
    .then(user => {
        if (user && user.password === password) {
            res.json({ message: "Success", user });  // Ensure 'user' includes '_id'
        } else { 
            res.status(401).json({ message: "Invalid credentials" });
        }
    })
    .catch(err => res.status(500).json({ error: "Error logging in", err }));
});

app.post('/register', (req, res) => {
  UserModel.create(req.body)
  .then(employees => res.json(employees))
  .catch(err => res.json(err))
})

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
      { $pull: { savedHotels: { hotelId } } }, // Depending on your Mongoose version, you might need to adjust this query
      { new: true }
  )
  .then(user => res.status(200).json(user.savedHotels))
  .catch(err => res.status(500).json({ error: "Error unsaving hotel", details: err }));
});


app.get('/api/hotelDetails/:hotelId', async (req, res) => {
  const { hotelId } = req.params;
  console.log("Fetching details for hotel ID:", hotelId);
  try {
    const response = await axios.get(`/api/hotelDetails?hotel_id=${hotelId}`);
      console.log("Hotel details fetched successfully:", response.data);
      res.json(response.data);
  } catch (error) {
      console.error('Failed to fetch hotel details:', error);
      res.status(404).json({message: "Hotel details not found"});
  }
});


const port = process.env.PORT || 3002;
app.listen(port, () => {
  console.log(`Server is running`);
});
