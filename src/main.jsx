import React, { useState } from 'react';
import Notification from './Notification'; // Импортируем Notification
import { Helmet } from 'react-helmet';
import './css/App.css';
import Header from './Header';
import Footer from './Footer'; // Импорт подвала
import UserProfile from './UserProfile'; // Импорт профиля пользователя

const Main = () => {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [notification, setNotification] = useState(null);

  const handleLoginSuccess = () => {
    setLoggedIn(true);
    setNotification(null); // Скрываем уведомление при новом входе
  };

  const handleLogout = () => {
    setLoggedIn(false);
  };

  const handleNotify = (message, type) => {
    setNotification({ message, type });
    setTimeout(() => {
      setNotification(null); // Убираем уведомление через 3 секунды
    }, 3000);
  };

  return (
    <div className="main-container">
      <Helmet>
        <title>exported project</title>
      </Helmet>
      <Header onLoginSuccess={handleLoginSuccess} onLogout={handleLogout} />
      {notification && (
        <Notification 
          message={notification.message} 
          type={notification.type} 
          onClose={() => setNotification(null)} 
        />
      )}
      
      {!isLoggedIn ? (
        <div className="main-main">
          <img
            src="./src/external/ellipse11594-6s1x-1900h.png"
            alt="Ellipse11594"
            className="main-ellipse1"
          />
          <div className="main-content1">
            <div className="main-block1">
              <div className="main-frame8">
                <span className="main-text15">Ищите айти исполнителей?</span>
                <span className="main-text16">
                  Нанимайте отличных фрилансеров быстро. ItFreelancer поможет вам
                  нанять фрилансеров в любой момент.
                </span>
                <div className="main-frame9">
                  <span className="main-text17">Найти специалиста</span>
                </div>
              </div>
              <img
                src="./src/external/image1550-xn03-800h.png"
                alt="IMAGE1550"
                className="main-image"
              />
            </div>
            {/* Остальная часть основного контента ... */}
          </div>
        </div>
      ) : (
        <UserProfile onLogout={handleLogout} />
      )}
      <Footer />
    </div>
  );
};

export default Main;
