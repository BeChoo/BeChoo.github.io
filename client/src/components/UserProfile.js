// UserProfile.js

import React, { useState } from 'react';
import './UserProfile.css'; // Importing the CSS file for styling

const UserProfile = ({ savedHotels }) => {
    const [userProfile, setUserProfile] = useState({
        name: "John Doe",
        bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        avatarUrl: "https://picsum.photos/200/300",
        savedHotels: ["Hyatt", "Holiday Inn"]
    });

    const addSavedHotel = (newHotel) => {
        setUserProfile({
            ...userProfile,
            savedHotels: [...userProfile.savedHotels, newHotel]
        });
    };

    return (
        <div className="profile-container">
            <img src={userProfile.avatarUrl} alt="User Avatar" className="profile-avatar"/>
            <h1 className="profile-name">{userProfile.name}</h1>
            <p className="profile-bio">{userProfile.bio}</p>
            <div className="saved-hotels">
                <h2>Saved Hotels</h2>
                <ul>
                    {userProfile.savedHotels.map(savedHotels => (
                        <li key={savedHotels}>{savedHotels}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default UserProfile;
