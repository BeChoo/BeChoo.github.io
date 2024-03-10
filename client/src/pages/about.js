// Filename - pages/about.js

import React from "react";
import Navbar from "../components/Navbar";
import "./about.css"; // Import CSS file for styling
import GoBeach from "../images/Go Beach.png"; // Adjusted import path

const About = () => {
    return (
        <div className="about-container">
            <Navbar />
            <h4>Welcome to Gotel! We are a dedicated and creative team of four students from California State University Long Beach. Our mission is to revolutionize your travel experience by providing a seamless and intuitive web app that simplifies every aspect of your journey. Whether you're planning a vacation, a business trip, or a spontaneous getaway, Gotel is here to make your travels stress-free and enjoyable.</h4>
            <h3>Feel free to reach out to us!</h3>
            <h4>Brian Bui: brian.bui02@student.csulb.edu</h4>
            <h4>Brian Cho: brian.cho02@student.csulb.edu</h4>
            <h4>Chase Calero: chase.calero@student.csulb.edu</h4>
            <h4>Miguie Aquino: miguieyves.aquino@student.csulb.edu</h4>
            <div><img src={GoBeach} alt="GoBeach"/></div>
        </div>
    );
};

export default About;
