// Filename - "./components/NavbarElements.js

import { FaBars } from "react-icons/fa";
import { NavLink as Link } from "react-router-dom";
import styled from "styled-components";

export const Nav = styled.nav`
    background: #ffffb3;
    height: 85px;
    display: flex;
    justify-content: center; 
    align-items: center; 
    padding: 0 50px; 
    width: 100%; 
    z-index: 12;
`;

export const NavLink = styled(Link)`
    color: #808080;
    display: flex;
    align-items: center;
    text-decoration: none;
    padding: 0 1rem;
    height: 100%;
    cursor: pointer;
    &.active {
        color: #4d4dff;
    }
`;

export const LogoImage = styled.img`
    height: 50px; // Adjust the height as per your logo size
    margin-right: 20px; // Adjust the margin as per your design
`;

export const Bars = styled(FaBars)`
    display: none;
    color: #808080;
    @media screen and (max-width: 768px) {
        display: block;
        position: absolute;
        top: 0;
        right: 0;
        transform: translate(-100%, 75%);
        font-size: 1.8rem;
        cursor: pointer;
    }
`;

export const NavMenu = styled.div`
    display: flex;
    align-items: center;
    margin-right: -24px;
    width: 100%; 
    justify-content: center; 
    @media screen and (max-width: 768px) {
        /* Remove display: none; to make NavMenu visible on smaller screens */
    }
`;
