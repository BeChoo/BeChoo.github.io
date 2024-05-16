import React from "react";
import { useLocation, Link } from "react-router-dom";
import { Nav, NavLink, NavMenu, LogoImage } from "./NavbarElements";
import GotelLogo from "../../images/GotelLogo.png";
import { useUser } from "../../pages/UserContext";
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
                            Hotel Search
                        </NavLink>
                        <NavLink to="/about" activeStyle>
                            About Us
                        </NavLink>
                        {user ? (
                            <div className="dropdown">
                                <button className="dropbtn">Profile</button>
                                <div className="dropdown-content">
                                    <Link to="/profile">View Profile</Link>
                                    {/* <button onClick={logout}>Logout</button> */}
                                    <button onClick={logout} className="dropdown-btn">Logout</button>
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
