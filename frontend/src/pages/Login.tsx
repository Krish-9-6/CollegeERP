import React, { useState } from "react";
import "./Login.css";
import Logo from "../assets/bits_logo.png";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

const Login: React.FC = () => {
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);

  const from = "/student-dashboard";

  const handleSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      await login(email, password);
      console.log("yaha se nav hoga");
      navigate(from, { replace: true });
      // replace:true means /login won't appear in browser history
      // so pressing Back won't take them back to the login page
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
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
            {submitting ? "Logging in..." : "Sign In"}
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
