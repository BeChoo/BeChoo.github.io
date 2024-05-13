import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useUser } from './UserContext.js'; // Adjust the path to UserContext if necessary
import './signup.css'; // Assuming this is where you have general styles

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState(''); // Added to handle messages
    const navigate = useNavigate();
    const { login } = useUser();

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:3002/login', { email, password })
            .then(response => {
                const { message, user } = response.data; // Expecting object with message and user
                if (user) {
                    login(user); // Store user in context/state
                    navigate('/index');
                } else {
                    setMessage(message); // Display error message from server
                }
            })
            .catch(error => {
                console.error("Login failed:", error.response ? error.response.data.message : "No response");
                setMessage("Wrong login credentials.");
            });
    };

    return (
        <div className="container">
            <form className="login" onSubmit={handleSubmit}>
                <label>
                    <strong>Email</strong>
                    <input
                        type="email"
                        placeholder="Enter Email"
                        autoComplete="off"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </label>
                <label>
                    <strong>Password</strong>
                    <input
                        type="password"
                        placeholder="Enter Password"
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </label>
                {message && <div className="error">{message}</div>}
                <button type="submit" className="btn btn-success w-100 rounded-0">
                    Login
                </button>
            </form>
            <p>Don't have an account?</p>
            <Link to="/" className="btn btn-default border w-100 bg-light rounded-0 text-decoration-none">
                Sign Up
            </Link>
        </div>
    );
}

export default Login;
