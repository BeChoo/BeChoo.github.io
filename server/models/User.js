const mongoose = require('mongoose');

// Define the schema for individual reviews
const reviewSchema = new mongoose.Schema({
    hotelId: String,  // Store hotelId as a string
    hotelName: String,
    hotelImageURL: String,
    rating: Number,
    reviewText: String
});


const savedHotelSchema = new mongoose.Schema({
    hotelId: String,
    hotelName: String
});

const UserSchema = new mongoose.Schema({
    name: String,
    email: { type: String, unique: true },
    password: String,
    reviews: [reviewSchema],
    savedHotels: [savedHotelSchema] // Array of objects containing hotelId and hotelName
});

// Create models from the defined schemas
const UserModel = mongoose.model("User", UserSchema);
const ReviewModel = mongoose.model("Review", reviewSchema);

// Export the models
module.exports = { UserModel, ReviewModel };
