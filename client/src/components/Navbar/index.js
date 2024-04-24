// Filename - "./components/Navbar.js

import React from "react";
import { useLocation } from "react-router-dom";
import { Nav, NavLink, NavMenu, LogoImage } from "./NavbarElements";
import GotelLogo from "../../images/GotelLogo.png"; // Path to your logo image

const Navbar = () => {

        // Get current location
        const location = useLocation();

        // Function to determine whether to show Navbar
        const showNavbar = () => {
            // Check if the current path is not '/'
            return location.pathname !== '/';
        }

    return (
        <>
            {/* Conditionally render Navbar */}
            {showNavbar() && (
            <Nav>
                <NavMenu>
                    <LogoImage src={GotelLogo} alt="GotelLogo" />
                    <NavLink to="/index" activeStyle>
                        Initial
                    </NavLink>
                    <NavLink to="/about" activeStyle>
                        About
                    </NavLink>
                    <NavLink to="/homepage" activeStyle>
                        Home
                    </NavLink>
                    <NavLink to="/mappage" activeStyle>
                        Use A Map
                    </NavLink>
                    <NavLink to="/compare" activeStyle>
                        Compare Hotels
                    </NavLink>
                </NavMenu>
            </Nav>
            )}
        </>
    );
};

export default Navbar;