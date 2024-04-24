import React from "react";
import Navbar from "./components/Navbar";
import {
    BrowserRouter as Router,
    Routes,
    Route,
} from "react-router-dom";
import './App.css';
import Home from "./pages";
import About from "./pages/about";
import Homepage from "./pages/homepage";
import SignUp from "./pages/signup";
import Compare from "./pages/compare";
import Mappage from "./pages/mappage";
import Hotel from './pages/Hotel';
import Signup from './pages/Signup.jsx'
import Login from './pages/Login.jsx'


 
function App() {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route exact path="/" element={<Signup />} />
                <Route path='/login' element={<Login />} />
                <Route path="/index" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/homepage" element={<Homepage />} />
                <Route path="/hotel/:id" element={<Hotel />} />
                <Route path="/mappage" element={<Mappage />} />
                <Route path="/compare" element={<Compare />} />
                <Route path="/sign-up" element={<SignUp />} />
            </Routes>
        </Router>
    );
}
 
export default App;