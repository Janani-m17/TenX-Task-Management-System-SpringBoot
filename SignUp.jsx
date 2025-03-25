import React, { useState } from 'react';
import '../styles/login.css'; // Reuse the same CSS as the Login page
import Illustration from '../assets/login-illustration.svg';
import Logo from '../assets/tenx logo.jpg';
import { Link } from 'react-router-dom';

const SignUp = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Signup attempt with:', { name, email, password });
    // Add your signup logic here (e.g., API call)
  };

  return (
    <div className="login-container">
      {/* Main Signup Card */}
      <div className="login-card">

        {/* Left Side - Illustration */}
        <div className="login-illustration">
          <img src={Illustration} alt="Signup Illustration" className="illustration-svg" />
          <div className="feature-bubbles">
            <div className="feature-bubble document"><span className="icon">📄</span></div>
            <div className="feature-bubble list"><span className="icon">≡</span></div>
            <div className="feature-bubble check"><span className="icon">✓</span></div>
          </div>
        </div>

        {/* Right Side - Signup Form */}
        <div className="login-form-container">

          {/* Logo and Brand */}
          <div className="brand-container">
            <img src={Logo} alt="TenX Logo" className="brand-logo" />
            <h1 className="brand-name">TenX</h1>
          </div>

          {/* Form Section */}
          <form className="login-form" onSubmit={handleSubmit}>

            {/* Name Input */}
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                placeholder="Your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            {/* Email Input */}
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                placeholder="Your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            {/* Password Input */}
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                placeholder="Create a password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {/* Submit Button */}
            <button type="submit" className="submit-button">
              Sign Up <span className="arrow">→</span>
            </button>

            {/* Navigation to Login */}
            <p className="switch-page">
              Already have an account? <Link to="/">Log in</Link>
            </p>

          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
