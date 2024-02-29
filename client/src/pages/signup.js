// Filename - pages/signup.js

import React from "react";
import "./signup.css";

const SignUp = () => {
  return (
    <div className="container">
      <form className="login">
          <input type="email" placeholder="Enter email"/>
          <input type="password" placeholder="Enter password"/>
          <input type="submit" style={{ backgroundColor: "skyblue" }} value="Sign Up" />
      </form>

      <p>Or continue as a guest:</p>
      <button style={{ backgroundColor: "lightgray", padding: "10px", borderRadius: "10px" }}>Continue as guest</button>
    </div>
  );
}

export default SignUp;
