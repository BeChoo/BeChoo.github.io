import React from "react";
import Navbar from "../components/Navbar";
import "./index.css"; // Import CSS file for styling
import Hyatt from "../images/Hyatt.png"; // Adjusted import path
import QueenMary from "../images/Queen Mary.png"; // Adjusted import path
import Renaissance from "../images/Renaissance.png"; // Adjusted import path
import Residence from "../images/Residence Inn.png"; // Adjusted import path

const Home = () => {
    return (
        <div>
            <Navbar />
            <h1 style={{textAlign: "center"}}>Welcome to Gotel!</h1>
            <div className="centered-content">
                <div className="image-container"><img src={Hyatt} alt="Hyatt"/></div>
                <div className="image-container"><img src={QueenMary} alt="QueenMary"/></div>
                <div className="image-container"><img src={Renaissance} alt="Renaissance"/></div>
                <div className="image-container"><img src={Residence} alt="Residence"/></div>
            </div>
        </div>
    );
};
 
export default Home;
