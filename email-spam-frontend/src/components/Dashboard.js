import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    // Simulate fetching user data
    const fetchData = () => {
      // Later: Replace with real API call to get user data
      const user = { email: 'user@example.com' };
      setUserData(user);
    };

    fetchData();
  }, []);

  const handleLogout = () => {
    // Handle logout (clear user data, tokens, etc.)
    navigate('/login');
  };

  return (
    <div style={styles.container}>
      <h2>Welcome to the Dashboard</h2>
      {userData ? (
        <>
          <p>Email: {userData.email}</p>
          <button onClick={handleLogout} style={styles.button}>Logout</button>
        </>
      ) : (
        <p>Loading user data...</p>
      )}
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '600px',
    margin: '80px auto',
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '10px',
    textAlign: 'center',
    boxShadow: '0 0 10px rgba(0,0,0,0.1)'
  },
  button: {
    padding: '10px',
    fontSize: '1rem',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer'
  }
};

export default Dashboard;
