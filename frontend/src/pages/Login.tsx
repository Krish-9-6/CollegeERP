import React, { useState } from "react";
import "./Login.css";
import axios from "axios";
import Logo from "../assets/bits_logo.png";
import { useNavigate } from "react-router-dom";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Sign in attempt with:", { email, password });
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
      });
      if (res.data && res.data.token.user) {
        alert(`Welcome, ${res.data.token.user.name}!`);
        localStorage.setItem("token", res.data.token.token);
        localStorage.setItem("user", JSON.stringify(res.data.token.user));
        console.log(res.data.user);
        const userRole = res.data.token.user.role;
        console.log(userRole);
        if (userRole === "STUDENT") {
          console.log("student part run");
          navigate("/student-dashboard");
        } else if (userRole === "FACULTY") {
          navigate("/faculty-dashboard");
        } else if (userRole === "PARENT") {
          navigate("/parent-dashboard");
        } else {
          alert("Invalid entry!");
        }
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        alert(
          error.response?.data?.message || "Login failed. Check your credentials",
        );
      } else {
        alert("Login failed. Check your credentials");
      }
      console.error(error);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <img src={Logo}></img>
          <div className="header-text">
            <h1>BITraumaStress Pilani</h1>
            <p className="header-subtitle">Pilani | Dubai | Goa | Hyderabad</p>
          </div>
        </div>

        <form onSubmit={handleSignIn} className="login-form">
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="example@college.edu"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
          </div>

          <div className="form-footer">
            <a href="#" className="forgot-password">
              Forgot Password?
            </a>
          </div>

          <button type="submit" className="signin-button">
            Sign In
          </button>
        </form>

        <div className="login-footer">
          <p>
            © {new Date().getFullYear()} College Administration. All rights
            reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
