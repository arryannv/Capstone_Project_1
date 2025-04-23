import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Login.css';


const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
  
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', {
        email,
        password,
      });
  
      if (res.data.success) {
        alert('Login successful!');
        localStorage.setItem('token', res.data.token);
        
        console.log('Token stored in localStorage:', localStorage.getItem('token')); // Check if token is stored
  
        // After storing the token, use navigate to route to dashboard
        console.log('Redirecting to /dashboard');
        navigate('/dashboard');
         // Redirect to Dashboard after successful login
      } else {
        alert(res.data.message || 'Login failed');
      }
    } catch (error) {
      console.error(error);
      alert('Login failed. Please try again!');
    }
  };
  

  return (

    <div className="login-container">
  <div className="login-card">
    <h2>Login</h2>
    <form onSubmit={handleLogin}>
      <div>
        <label>Email:</label>
        <input 
          type="email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          required 
        />
      </div>
      <div>
        <label>Password:</label>
        <input 
          type="password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          required 
        />
      </div>
      <button type="submit">Login</button>
    </form>
    <p>Don't have an account? <a href="/signup">Sign Up</a></p>
  </div>
</div>

  )
}
export default Login;
