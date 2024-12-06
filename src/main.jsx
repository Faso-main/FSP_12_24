// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client'; // Измените этот импорт
import './css/main.css';
import './css/Header_Footer.css';
import Header from './Header.jsx';
import Footer from './Footer.jsx';
import UserAccount from './UserAccount.jsx';  
import App from './App.jsx';  

// Создайте корень для вашего приложения
const root = ReactDOM.createRoot(document.getElementById('root'));

// Используйте метод render с созданным корнем
root.render(
  <React.StrictMode>
    <App /> {/* Основной компонент пользователя */}
  </React.StrictMode>
);
