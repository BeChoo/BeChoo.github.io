// Filename - "./components/Navbar.js

import React from "react";
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
                    <NavLink to="/sign-up" activeStyle>
                        Sign Up
                    </NavLink>
                </NavMenu>
            </Nav>
        </>
    );
};

export default Navbar;
