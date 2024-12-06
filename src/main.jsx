import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import './css/App.css';
import Header from './Header';
import UserProfile from './UserProfile'; // Import user profile component
import axios from 'axios'; // Import axios

const Main = () => {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [isFadingOut, setFadingOut] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleLoginSuccess = async (username, password) => {
    if (!isLoggedIn) {
      setFadingOut(true);
      try {
        const response = await axios.post('/api/users/login', { username, password });
        console.log(response.data); // Handle successful login response
        setLoggedIn(true);
      } catch (error) {
        console.error('Login failed:', error);
        setErrorMessage('Login failed. Please try again.'); // Show error message
      } finally {
        setFadingOut(false);
      }
    }
  };

  const handleLogout = async () => {
    setFadingOut(true);
    try {
      await axios.post('/api/users/logout');
      setLoggedIn(false);
    } catch (error) {
      console.error('Logout failed:', error);
    } finally {
      setFadingOut(false);
    }
  };

  return (
    <div className="main-container">
      <Helmet>
        <title>exported project</title>
      </Helmet>
      <Header onLoginSuccess={handleLoginSuccess} onLogout={handleLogout} />
      {/* Show an error message if login fails */}
      {errorMessage && <div className="error-message">{errorMessage}</div>}
      {!isLoggedIn ? (
        <div className={`main-main ${isFadingOut ? 'fade-out' : 'fade-in'}`}>
          {/* Rest of your existing JSX code */}
        </div>
      ) : (
        <UserProfile onLogout={handleLogout} />
      )}
    </div>
  );
};

export default Main;
