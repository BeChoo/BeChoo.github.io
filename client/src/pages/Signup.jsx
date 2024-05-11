import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./signup.css"; // Import the CSS file

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(
        "https://gotel-frontend-git-hosting-bechoos-projects.vercel.app/register",
        { name, email, password }
      )
      .then((result) => {
        console.log(result);
        navigate("/login");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="container">
      <form className="login" onSubmit={handleSubmit}>
        <label>
          <strong>Name</strong>
          <input
            type="text"
            placeholder="Enter Name"
            autoComplete="off"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
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
        <input
          type="submit"
          style={{ backgroundColor: "skyblue" }}
          value="Register"
        />
      </form>
      <p>Already Have an Account</p>
      <Link
        to="/login"
        className="btn btn-default border w-100 bg-light rounded-0 text-decoration-none"
      >
        Login
      </Link>
    </div>
  );
}

export default Signup;
