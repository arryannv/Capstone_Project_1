import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import './ForgotPassword.css';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const [resetLink, setResetLink] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');
    setResetLink('');
    setIsLoading(true);

    try {
      const res = await axios.post('http://localhost:5000/api/auth/forgot-password', { email });
      setMessage(res.data.message || 'Password reset link sent to your email.');
      if (res.data.resetLink) {
        setResetLink(res.data.resetLink);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to send password reset link.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-wrapper">
        <div className="auth-left">
          <div className="auth-banner">
            <div className="logo">
              <span className="logo-icon">📧</span>
              <h1>SpamSniper</h1>
            </div>
            <h2>Forgot Password</h2>
            <p>Enter your email to receive a password reset link.</p>
          </div>
        </div>

        <div className="auth-right">
          <div className="auth-form-container">
            {message && <div className="auth-success">{message}</div>}
            {error && <div className="auth-error">{error}</div>}
            {resetLink && (
              <div className="auth-info">
                <p>
                  Click the link below to reset your password:
                </p>
                <a href={resetLink}>{resetLink}</a>
              </div>
            )}

            <form onSubmit={handleSubmit} className="auth-form">
              <div className="form-group">
                <label>Email Address</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  required
                />
              </div>

              <button type="submit" className="auth-button" disabled={isLoading}>
                {isLoading ? 'Sending...' : 'Send Reset Link'}
              </button>
            </form>

            <div className="auth-footer">
              <p>Remembered your password? <Link to="/" className="auth-link">Sign In</Link></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
