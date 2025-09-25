import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import './Auth.css';

function SignIn() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({ 
    email: '', 
    password: '',
    name: '' // Add name field
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const userData = {
      email: formData.email,
      name: formData.name || "Mahesh Rajput" // Use form name or default
    };
    
    login(userData);
    navigate('/dashboard');
  };

  return (
    <div className="auth-card">
      <h1>Sign In</h1>
      <p className="auth-subtitle">Enter your credentials to access your account</p>
      <div className="divider"></div>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <input
            type="text"
            name="name"
            placeholder="Enter your full name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="input-group">
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="input-group">
          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="auth-button">Sign In</button>
      </form>
      <p className="auth-link">
        Don&apos;t have an account? <Link to="/signup" className="auth-link-text">Sign up</Link>
      </p>
    </div>
  );
}

export default SignIn;
