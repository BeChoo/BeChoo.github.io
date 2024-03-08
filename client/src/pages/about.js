// Filename - pages/about.js

import React from "react";
import "./about.css"; // Import CSS file for styling
import GoBeach from "../images/Go Beach.png"; // Adjusted import path

const About = () => {
    return (
        <div className="about-container">
            <div><img src={GoBeach} alt="GoBeach"/></div>
            <div>Welcome to Gotel! We are a dedicated and creative team of four students from California State University Long Beach. Our mission is to revolutionize your travel experience by providing a seamless and intuitive web app that simplifies every aspect of your journey. Whether you're planning a vacation, a business trip, or a spontaneous getaway, Gotel is here to make your travels stress-free and enjoyable.</div>
            <div>Feel free to reach out to us!<br />
            Brian Bui: brian.bui02@student.csulb.edu<br />
            Brian Cho: brian.cho02@student.csulb.edu<br />
            Chase Calero: chase.calero@student.csulb.edu<br />
            Miguie Aquino: miguieyves.aquino@student.csulb.edu</div>
        </div>
    );
};

export default About;
