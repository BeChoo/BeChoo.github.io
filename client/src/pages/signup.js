import React from "react";
import "./signup.css";
 
const SignUp = () => {
    return (
        <>
            <p className="title">Welcome to Gotel!</p>
 
            <form className="login">
                <label for="email">Enter email</label>
                <input type="email"/>
                <label for="password">Enter password</label>
                <input type="password"/>
                <input type="submit" style={{ backgroundColor: "skyblue" }} />
            </form>
        </>
    );
}

export default SignUp;