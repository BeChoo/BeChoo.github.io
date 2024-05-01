import React from "react";
import "./index.css"; // Import CSS file for styling
import Hyatt from "../images/Hyatt.png"; // Adjusted import path
import QueenMary from "../images/Queen Mary.png"; // Adjusted import path
import Renaissance from "../images/Renaissance.png"; // Adjusted import path
import Residence from "../images/Residence Inn.png"; // Adjusted import path

// Home component rendering hotel images and information
const Home = () => {
    return (
        <div>
            <h1 style={{textAlign: "center"}}>Welcome to Gotel!</h1>
            <div className="centered-content">
                <div className="image-container"><img src={Hyatt} alt="Hyatt"/></div>
                <div className="image-container"><img src={QueenMary} alt="QueenMary"/></div>
                <div className="image-container"><img src={Renaissance} alt="Renaissance"/></div>
                <div className="image-container"><img src={Residence} alt="Residence"/></div>
            </div>
            <div style={{textAlign: "center", marginTop: "50px"}}>
                <h2>Hotel of the Day!</h2>
                <h3>Kawada Hotel</h3>
                <div style={{textAlign: "center"}}>
                    <img src="https://images.trvl-media.com/lodging/1000000/30000/25200/25151/9eda9964.jpg?impolicy=resizecrop&rw=1200&ra=fit" alt="Kawada Hotel" style={{width: "300px", height: "200px"}} />
                </div>
                <p style={{fontSize: "12px", marginTop: "10px"}}>Based on your location and limited time offers</p>
                <p style={{fontSize: "20px", marginTop: "10px"}}>★★★</p>
            </div>
        </div>
    );
};
 
export default Home;
