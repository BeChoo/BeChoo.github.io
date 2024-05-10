import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));
    const [reviews, setReviews] = useState([]);

    const [savedHotels, setSavedHotels] = useState(user?.savedHotels || []);

    const updateSavedHotels = (hotels) => {
        setSavedHotels(hotels);
        // Update the user object and local storage
        const updatedUser = { ...user, savedHotels: hotels };
        localStorage.setItem('user', JSON.stringify(updatedUser));
        setUser(updatedUser);
    };

    const fetchUserReviews = (userId) => {
        axios.get(`https://gotel-frontend.vercel.app/userReviews/${userId}`)
            .then(response => {
                setReviews(response.data); // Assuming the data structure matches what you expect
            })
            .catch(error => console.error('Error fetching reviews:', error));
    };

    const login = (userData) => {
        localStorage.setItem('user', JSON.stringify(userData));
        setUser(userData);
        fetchUserReviews(userData._id);
    };

    const logout = () => {
        localStorage.removeItem('user');
        setUser(null);
        setReviews([]);
    };

    return (
        <UserContext.Provider value={{ user, reviews, updateSavedHotels, login, logout, fetchUserReviews }}>
            {children}
        </UserContext.Provider>
    );
};

export default UserProvider;