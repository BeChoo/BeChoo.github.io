// Filename - "./components/Navbar.js


import React from "react";
import { Nav, NavLink, NavMenu, LogoImage } from "./NavbarElements";
import GotelLogo from "../../images/GotelLogo.png"; // Path to your logo image

import { Nav, NavLink, NavMenu, LogoImage } from "./NavbarElements";
import GotelLogo from "../../images/GotelLogo.png"; // Path to your logo image

const Navbar = () => {
    return (
        <>
            <Nav>
                <NavMenu>
                    <LogoImage src={GotelLogo} alt="GotelLogo" />
                    <NavLink to="/index" activeStyle>
                        Initial
                    </NavLink>
                    <NavLink to="/homepage" activeStyle>
                        Home
                    </NavLink>
                    <NavLink to="/mappage" activeStyle>
                        Browse Hotels
                    </NavLink>
                    <NavLink to="/compare" activeStyle>
                        Compare Hotels
                    </NavLink>
                    <NavLink to="/sign-up" activeStyle>
                        Sign Up
                    </NavLink>
                    <NavLink to="/about" activeStyle>
                        About
                    </NavLink>
                </NavMenu>
            </Nav >
        </>
    );
};

export default Navbar;
