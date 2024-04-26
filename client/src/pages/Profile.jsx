import React from 'react';
import { useUser } from './UserContext';

function Profile() {
    const { user } = useUser();

    return (
        <div>
            <h1>User Profile</h1>
            <p>Name: {user?.name}</p>
            <p>Email: {user?.email}</p>
            <p>Password: {user?.password}</p> {/* Displaying passwords like this is generally not recommended */}
        </div>
    );
}

export default Profile;
