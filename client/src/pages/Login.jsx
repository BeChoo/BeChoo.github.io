import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useUser } from './UserContext.js'; // Adjust the path to UserContext if necessary
import './signup.css'; // Assuming this is where you have general styles

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { login } = useUser();

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:3002/login', { email, password })
            .then(response => {
                if (response.data === "Success") {
                    login({ email, password }); // Mocking user data storage, adjust as necessary
                    navigate('/index');
                } else {
                    setError(response.data);
                }
            })
            .catch(error => {
                console.error("Login failed:", error);
                setError("Failed to communicate with the server.");
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
                {error && <div className="error">{error}</div>}
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
