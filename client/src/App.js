import React from "react";
import { FaSearchLocation } from "react-icons/fa";
import Navbar from "./components/NavbarElements";
import {
    BrowserRouter as Router,
    Routes,
    Route,
} from "react-router-dom";
import Home from "./pages";
import About from "./pages/about";
import Homepage from "./pages/homepage";
import SignUp from "./pages/signup";
import Contact from "./pages/contact";
import Search from "./pages/search";

function App() {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route exact path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/homepage" element={<Homepage />} />
                <Route path="/sign-up" element={<SignUp />} />
                <Route path="search" element={<Search />} />
            </Routes>
        </Router>
    );
}

export default App;
