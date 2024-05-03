const mongoose = require('mongoose');

// Define the schema for individual reviews
const reviewSchema = new mongoose.Schema({
    hotelId: String,  // Storing hotelId as a string since you use it like that
    rating: Number,
    reviewText: String
});

const UserSchema = new mongoose.Schema({
    name: String,
    email: { type: String, unique: true },  // Ensure email is unique across users
    password: String,
    reviews: [reviewSchema]  // Embedding reviews within the user document
});

// Create models from the defined schemas
const UserModel = mongoose.model("User", UserSchema);
const ReviewModel = mongoose.model("Review", reviewSchema);

// Export the models
module.exports = { UserModel, ReviewModel };
