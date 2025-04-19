import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Signup = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSignup = async (e) => {
    e.preventDefault();
    
    // Basic client-side validation (feel free to add more)
    if (!email || !password) {
      setErrorMessage('Please fill in both fields');
      return;
    }

    try {
      const response = await axios.post('/api/signup', { email, password });
      
      // Assuming a successful signup will send a confirmation message
      if (response.status === 200) {
        setSuccessMessage('Signup successful! Redirecting to login...');
        setTimeout(() => navigate('/login'), 2000);
      }
    } catch (error) {
      setErrorMessage(error.response?.data?.message || 'Something went wrong. Please try again.');
    }
  };

  return (
    <div style={styles.container}>
      <h2>Sign Up</h2>
      <form onSubmit={handleSignup}>
        <div style={styles.inputContainer}>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            style={styles.input}
          />
        </div>
        <div style={styles.inputContainer}>
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            style={styles.input}
          />
        </div>
        {errorMessage && <p style={styles.error}>{errorMessage}</p>}
        {successMessage && <p style={styles.success}>{successMessage}</p>}
        <button type="submit" style={styles.button}>Sign Up</button>
      </form>
      <p>Already have an account? <a href="/login">Login here</a></p>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '400px',
    margin: '80px auto',
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '10px',
    textAlign: 'center',
    boxShadow: '0 0 10px rgba(0,0,0,0.1)'
  },
  inputContainer: {
    marginBottom: '15px'
  },
  input: {
    width: '100%',
    padding: '10px',
    marginTop: '5px',
    fontSize: '1rem',
    border: '1px solid #ccc',
    borderRadius: '5px'
  },
  button: {
    padding: '10px',
    fontSize: '1rem',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer'
  },
  error: {
    color: 'red',
    fontSize: '0.9rem'
  },
  success: {
    color: 'green',
    fontSize: '0.9rem'
  }
};

export default Signup;
