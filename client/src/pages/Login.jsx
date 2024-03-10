import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './signup.css'; // Import the CSS file

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:3001/login', { email, password })
            .then(result => {
                console.log(result);
                if (result.data === "Success") {
                    navigate('/index');
                }
            })
            .catch(err => console.log(err));
    }

    const handleContinueAsGuest = () => {
        navigate('/index');
    }

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
                <button type="submit" className="btn btn-success w-100 rounded-0">
                    Login
                </button>
            </form>
            <p>Don't have an account?</p>
            <Link to="/" className="btn btn-default border w-100 bg-light rounded-0 text-decoration-none">
                Sign Up
            </Link>
            <p>Or continue as a guest:</p>
            <button className="btn btn-light w-100 rounded-0" onClick={handleContinueAsGuest}>
                Continue as guest
            </button>
        </div>
    );
}

export default Login;
