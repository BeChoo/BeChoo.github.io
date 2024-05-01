const mongoose = require('mongoose');

// Define the schema for individual reviews
const reviewSchema = new mongoose.Schema({
    hotelId: mongoose.Types.ObjectId, // ID of the hotel reviewed
    rating: Number, // Rating given by the user
    reviewText: String // Textual review provided by the user
  });

  // Define the schema for the user
const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  reviews: [reviewSchema], // Array of reviews given by the user
});

// Create models from the defined schemas
const UserModel = mongoose.model("User", UserSchema);
const ReviewModel = mongoose.model("Review", reviewSchema);

// Export the models
module.exports = { UserModel, ReviewModel };
