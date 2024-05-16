import React from "react";
import { useLocation, Link } from "react-router-dom";
import { Nav, NavLink, NavMenu, LogoImage } from "./NavbarElements";
import GotelLogo from "../../images/GotelLogo.png"; // Adjust the path to your logo image
import { useUser } from "../../pages/UserContext"; // Adjust the path to UserContext if necessary
import '../index.css';

const Navbar = () => {
    const { user, logout } = useUser();
    const location = useLocation();

    const showNavbar = () => {
        return !['/', '/login'].includes(location.pathname);
    };

    return (
        <>
            {showNavbar() && (
                <Nav>
                    <NavMenu>
                        <LogoImage src={GotelLogo} alt="GotelLogo" />
                        <NavLink to="/index" activeStyle>
                            Home
                        </NavLink>
                        <NavLink to="/homepage" activeStyle>
                            Use A Map
                        </NavLink>
                        <NavLink to="/mappage" activeStyle>
                            Remove This
                        </NavLink>
                        <NavLink to="/about" activeStyle>
                            About Us
                        </NavLink>
                        {user ? (
                            <div className="dropdown">
                                <button className="dropbtn">Profile</button>
                                <div className="dropdown-content">
                                    <Link to="/profile">View Profile</Link>
                                    <button onClick={logout}>Logout</button>
                                </div>
                            </div>
                        ) : (
                            <NavLink to="/login" activeStyle>
                                Sign In
                            </NavLink>
                        )}
                    </NavMenu>
                </Nav>
            )}
        </>
    );
};

export default Navbar;
