import React, { useState } from "react";
import "./Login.css";
import Logo from "../assets/bits_logo.png";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Sign in attempt with:", { email, password });
    // TODO: Add authentication logic here
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
