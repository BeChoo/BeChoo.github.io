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

    // State to handle new bio input
    const [newBio, setNewBio] = useState('');

    // State to store profile picture
    const [avatar, setAvatar] = useState(userProfile.avatarUrl);

    // Update bio
    const updateBio = (event) => {
        setUserProfile({
            ...userProfile,
            bio: newBio
        });
    };

    // Function to handle avatar file selection
    const handleAvatarChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            // Convert file to a data URL or dispatch an action to upload it to your server
            const reader = new FileReader();
            reader.onloadend = () => {
                // Use reader.result which contains a data URL of the image
                setUserProfile((prevProfile) => ({
                    ...prevProfile,
                    avatarUrl: reader.result,
                }));
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="profile-container">
            <div className="profile-avatar-container">
                <img src={userProfile.avatarUrl} alt="User Avatar" className="profile-avatar" />
                <input
                    type="file"
                    id="avatarInput"
                    hidden
                    accept="image/*"
                    onChange={handleAvatarChange}
                />
                <button
                    className="avatar-upload-button"
                    onClick={() => document.getElementById('avatarInput').click()}
                >
                    Upload Avatar
                </button>
            </div>
            <h1 className="profile-name">{userProfile.name}</h1>
            <p className='profile-bio'>{userProfile.bio}</p>
            <div className='bio-update-container'>
                <textarea
                    value={newBio}
                    onChange={(e) => setNewBio(e.target.value)}
                    placeholder="Update your bio"
                    className='bio-update-textarea'
                />
                <button onClick={updateBio} className='bio-update-button'>Update Bio</button>
            </div>
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
