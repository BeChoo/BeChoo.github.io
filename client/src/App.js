import React, { useState } from "react";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import './App.css';
import Home from "./pages";
import About from "./pages/about";
import Homepage from "./pages/homepage";
import SignUp from "./pages/signup";
import Compare from "./pages/compare";
import Mappage from "./pages/mappage";
import HotelDetailPage from "./pages/hoteldetails";
import UserProfile from "./pages/UserProfile";

function App() {
    // Added state and saving hotels - Brian C.
    const [savedHotels, setSavedHotels] = useState([]);

    const addSavedHotel = (hotelName) => {
        setSavedHotels((prevSavedHotels) => [...prevSavedHotels, hotelName]);
    };

    return (
        <Router>
            <Navbar />
            <Routes>
                <Route exact path="/" element={<Home />} />
                <Route path="/index" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/homepage" element={<Homepage />} />
                <Route path="/mappage" element={<Mappage />} />
                <Route path="/compare" element={<Compare />} />
                <Route path="/user-profile" element={<UserProfile />} />
                <Route path="/sign-up" element={<SignUp />} />
                <Route path="/hotel/:id" element={<HotelDetailPage />} />
            </Routes>
        </Router>
    );
}

export default App;
