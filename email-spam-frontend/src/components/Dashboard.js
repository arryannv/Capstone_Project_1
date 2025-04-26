// src/components/Dashboard.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Dashboard.css';

// Icons (you'll need to install: npm install react-icons)
import { FiMail, FiAlertCircle, FiCheckCircle, FiClock, FiUpload, FiLogOut, FiUser, FiSettings } from 'react-icons/fi';
import { IoAnalytics } from 'react-icons/io5';

const Dashboard = () => {
  const [emailContent, setEmailContent] = useState('');
  const [analysisResult, setAnalysisResult] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [emailHistory, setEmailHistory] = useState([]);
  const [activeTab, setActiveTab] = useState('analyze');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const navigate = useNavigate();

  // Mock function for email analysis (replace with actual API call)
  const analyzeEmail = async () => {
    if (!emailContent.trim()) {
      alert('Please enter email content');
      return;
    }

    setIsAnalyzing(true);
    
    try {
      // This would be your actual API endpoint
      // const response = await axios.post('http://localhost:5000/api/analyze', { content: emailContent });
      
      // Mock response for demonstration
      setTimeout(() => {
        const mockResult = {
          isSpam: Math.random() > 0.5,
          spamProbability: Math.random().toFixed(2),
          categories: {
            phishing: (Math.random() * 100).toFixed(1),
            promotional: (Math.random() * 100).toFixed(1),
            scam: (Math.random() * 100).toFixed(1),
            legitimate: (Math.random() * 100).toFixed(1),
          },
          keywords: ['urgent', 'money', 'account', 'verify'],
          timestamp: new Date().toISOString(),
        };

        setAnalysisResult(mockResult);
        
        // Add to email history
        const historyItem = {
          id: Date.now(),
          preview: emailContent.substring(0, 50) + (emailContent.length > 50 ? '...' : ''),
          result: mockResult.isSpam ? 'Spam' : 'Not Spam',
          probability: mockResult.spamProbability,
          timestamp: mockResult.timestamp,
        };
        
        setEmailHistory(prev => [historyItem, ...prev]);
        setIsAnalyzing(false);
      }, 1500);
      
    } catch (error) {
      console.error('Analysis error:', error);
      setIsAnalyzing(false);
      alert('Error analyzing email. Please try again.');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      setEmailContent(event.target.result);
    };
    reader.readAsText(file);
  };

  // Sample data for the dashboard stats
  const stats = {
    totalEmails: emailHistory.length,
    spamDetected: emailHistory.filter(item => item.result === 'Spam').length,
    accuracy: '95%'
  };

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <div className={`sidebar ${sidebarCollapsed ? 'collapsed' : ''}`}>
        <div className="sidebar-header">
          <h2>SpamSniper</h2>
          <button className="toggle-btn" onClick={() => setSidebarCollapsed(!sidebarCollapsed)}>
            {sidebarCollapsed ? '>' : '<'}
          </button>
        </div>
        
        <div className="sidebar-menu">
          <button 
            className={activeTab === 'analyze' ? 'active' : ''} 
            onClick={() => setActiveTab('analyze')}
          >
            <FiMail /> {!sidebarCollapsed && 'Analyze Email'}
          </button>
          
          <button 
            className={activeTab === 'history' ? 'active' : ''} 
            onClick={() => setActiveTab('history')}
          >
            <FiClock /> {!sidebarCollapsed && 'History'}
          </button>
          
          <button 
            className={activeTab === 'stats' ? 'active' : ''} 
            onClick={() => setActiveTab('stats')}
          >
            <IoAnalytics /> {!sidebarCollapsed && 'Statistics'}
          </button>
          
          <button 
            className={activeTab === 'settings' ? 'active' : ''} 
            onClick={() => setActiveTab('settings')}
          >
            <FiSettings /> {!sidebarCollapsed && 'Settings'}
          </button>
        </div>
        
        <div className="sidebar-footer">
          <button onClick={handleLogout}>
            <FiLogOut /> {!sidebarCollapsed && 'Logout'}
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="main-content">
        {/* Analyze Email Tab */}
        {activeTab === 'analyze' && (
          <div className="content-section">
            <h2>Email Analysis</h2>
            <p>Paste an email below or upload a file to detect spam.</p>
            
            <div className="email-input-container">
              <textarea
                className="email-input"
                placeholder="Paste email content here..."
                value={emailContent}
                onChange={(e) => setEmailContent(e.target.value)}
              />
              
              <div className="email-actions">
                <label className="upload-btn">
                  <FiUpload /> Upload Email File
                  <input
                    type="file"
                    accept=".txt,.eml"
                    onChange={handleFileUpload}
                    style={{ display: 'none' }}
                  />
                </label>
                
                <button 
                  className="analyze-btn" 
                  onClick={analyzeEmail} 
                  disabled={isAnalyzing || !emailContent.trim()}
                >
                  {isAnalyzing ? 'Analyzing...' : 'Analyze Now'}
                </button>
              </div>
            </div>
            
            {/* Analysis Result */}
            {analysisResult && (
              <div className="result-container">
                <div className="result-header">
                  <h3>Analysis Result</h3>
                  <div className={`result-badge ${analysisResult.isSpam ? 'spam' : 'safe'}`}>
                    {analysisResult.isSpam ? (
                      <>
                        <FiAlertCircle /> Spam Detected
                      </>
                    ) : (
                      <>
                        <FiCheckCircle /> Safe Email
                      </>
                    )}
                  </div>
                </div>
                
                <div className="result-details">
                  <div className="probability-meter">
                    <div className="meter-label">
                      <span>Safe</span>
                      <span>Spam Probability: {(analysisResult.spamProbability * 100).toFixed(0)}%</span>
                      <span>Spam</span>
                    </div>
                    <div className="meter-bar">
                      <div 
                        className="meter-fill" 
                        style={{ width: `${analysisResult.spamProbability * 100}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  <div className="categories">
                    <h4>Category Analysis</h4>
                    <div className="category-bars">
                      {Object.entries(analysisResult.categories).map(([category, value]) => (
                        <div className="category-item" key={category}>
                          <div className="category-label">
                            <span>{category.charAt(0).toUpperCase() + category.slice(1)}</span>
                            <span>{value}%</span>
                          </div>
                          <div className="category-bar">
                            <div 
                              className="category-fill"
                              style={{ 
                                width: `${value}%`,
                                backgroundColor: 
                                  category === 'phishing' ? '#e74c3c' :
                                  category === 'promotional' ? '#f39c12' :
                                  category === 'scam' ? '#c0392b' : '#2ecc71'
                              }}
                            ></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {analysisResult.keywords && analysisResult.keywords.length > 0 && (
                    <div className="keywords">
                      <h4>Detected Keywords</h4>
                      <div className="keyword-tags">
                        {analysisResult.keywords.map((keyword, index) => (
                          <span key={index} className="keyword-tag">{keyword}</span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        )}
        
        {/* Email History Tab */}
        {activeTab === 'history' && (
          <div className="content-section">
            <h2>Email History</h2>
            {emailHistory.length === 0 ? (
              <div className="empty-history">
                <FiMail className="empty-icon" />
                <p>No emails analyzed yet</p>
                <button onClick={() => setActiveTab('analyze')}>Analyze Your First Email</button>
              </div>
            ) : (
              <div className="history-list">
                <div className="history-header">
                  <span>Email</span>
                  <span>Result</span>
                  <span>Probability</span>
                  <span>Date</span>
                </div>
                {emailHistory.map((email) => (
                  <div className="history-item" key={email.id}>
                    <span className="email-preview">{email.preview}</span>
                    <span className={`result-tag ${email.result === 'Spam' ? 'spam' : 'safe'}`}>
                      {email.result}
                    </span>
                    <span className="probability">{(email.probability * 100).toFixed(0)}%</span>
                    <span className="timestamp">
                      {new Date(email.timestamp).toLocaleDateString()}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
        
        {/* Statistics Tab */}
        {activeTab === 'stats' && (
          <div className="content-section">
            <h2>Your Statistics</h2>
            <div className="stats-container">
              <div className="stat-card">
                <div className="stat-icon">
                  <FiMail />
                </div>
                <div className="stat-info">
                  <span className="stat-value">{stats.totalEmails}</span>
                  <span className="stat-label">Total Emails</span>
                </div>
              </div>
              
              <div className="stat-card">
                <div className="stat-icon spam">
                  <FiAlertCircle />
                </div>
                <div className="stat-info">
                  <span className="stat-value">{stats.spamDetected}</span>
                  <span className="stat-label">Spam Detected</span>
                </div>
              </div>
              
              <div className="stat-card">
                <div className="stat-icon safe">
                  <FiCheckCircle />
                </div>
                <div className="stat-info">
                  <span className="stat-value">{stats.accuracy}</span>
                  <span className="stat-label">Detection Accuracy</span>
                </div>
              </div>
            </div>
            
            <div className="stat-chart">
              <h3>Coming Soon: Advanced Analytics</h3>
              <p>We're working on adding advanced analytics charts to provide deeper insights into your email trends.</p>
            </div>
          </div>
        )}
        
        {/* Settings Tab */}
        {activeTab === 'settings' && (
          <div className="content-section">
            <h2>Account Settings</h2>
            <div className="settings-container">
              <div className="settings-card">
                <h3>Profile Information</h3>
                <div className="form-group">
                  <label>Email Address</label>
                  <input type="email" value="user@example.com" disabled />
                </div>
                <button className="settings-btn">Change Password</button>
              </div>
              
              <div className="settings-card">
                <h3>Notification Preferences</h3>
                <div className="preference-item">
                  <label className="switch">
                    <input type="checkbox" checked />
                    <span className="slider"></span>
                  </label>
                  <span>Email notifications for high-risk spam</span>
                </div>
                <div className="preference-item">
                  <label className="switch">
                    <input type="checkbox" />
                    <span className="slider"></span>
                  </label>
                  <span>Weekly spam report summary</span>
                </div>
              </div>
              
              <div className="settings-card danger-zone">
                <h3>Danger Zone</h3>
                <p>These actions cannot be undone. Please proceed with caution.</p>
                <button className="danger-btn">Delete Account</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;