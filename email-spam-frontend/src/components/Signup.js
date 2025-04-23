import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "./Signup.css"

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const handleSignup = async (e) => {
    e.preventDefault();
  
    try {
      const res = await axios.post('http://localhost:5000/api/auth/signup', {
        email,
        password,
      });
  
      if (res.data.success) {
        alert('Signup successful!');
        localStorage.setItem('token', res.data.token);  // ✅ auto-login
        
        navigate('/dashboard');
        
        //navigate('/dashboard');  // ✅ go straight to dashboard
      } else {
        alert(res.data.message || 'Signup failed');
      }
    } catch (error) {
      console.error(error);
      alert('Signup failed. Please try again!');
    }
  };
  

  return (
    <div className="signup-container">
      <div className="signup-card">
        <h1>SpamSniper</h1>
        <h2>Sign Up</h2>
        <form onSubmit={handleSignup}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Sign Up</button>
        </form>
        <p>Already have an account? <a href="/">Login</a></p>
      </div>
    </div>
  );
};

export default Signup;
