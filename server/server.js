const express = require('express');
const mongoose = require('mongoose');
const cors = require("cors");
const CityModel = require('../client/src/pages/api/city');
const hotelModel = require('../client/src/pages/api/hotels');
const EmployeeModel = require('./models/User')

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect("mongodb+srv://chasecalero:chasecalero@gotel.pkl54mr.mongodb.net/Gotel?retryWrites=true&w=majority")
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch(() => {
    console.log("Connection failed");
  });

// Route for fetching city data
app.get("/api/city", (req, res) => {
  const { searchCity } = req.query;
  CityModel.findOne({ name: searchCity })
    .then(city => {
      if (city) {
        res.json(city);
      } else {
        res.status(404).json({ message: "City not found" });
      }
    })
    .catch(error => {
      console.error("Error fetching city data:", error);
      res.status(500).json({ message: "Internal server error" });
    });
});

// Route for fetching hotel data
app.get("/api/hotels", (req, res) => {
  const { city, checkIn, checkOut, guests } = req.query;
  // Assuming you have a model function to fetch hotels based on the provided parameters
  hotelModel.find({ city, checkIn, checkOut, guests })
      .then((hotels) => {
          res.json(hotels);
      })
      .catch((err) => {
          console.error("Error fetching hotel data:", err);
          res.status(500).json({ error: "Internal server error" });
      });
});

app.post("/login", (req, res) => {
  const {email, password} = req.body
  EmployeeModel.findOne({email: email})
  .then(user => {
    if (user){
        if(user.password === password){
          res.json("Success")
        }else{
          res.json("The password is incorrect")
        }
    }else{
      res.json("No record exists")
    }
  })
})

app.post('/register', (req, res) => {
  EmployeeModel.create(req.body)
  .then(employees => res.json(employees))
  .catch(err => res.json(err))
})


const PORT = process.env.PORT || 3002;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});