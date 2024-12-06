// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom';
import './css/main.css';
import './css/Header_Footer.css';
import Footer from './Footer.jsx';
import UserAccount from './UserAccount.jsx';  // Импорт вашего компонента UserAccount

function Header() {
  return (
    <header className="app-header">
      <h1 className="logo">ItFreelanser</h1>
      <nav className="navbar">
        <ul>
          <li><a href="#orders">Заказчику</a></li>
          <li><a href="#reviews">Исполнителю</a></li>
          <li><a href="#wallet">Войти</a></li>
        </ul>
      </nav>
    </header>
  );
}

ReactDOM.render(
  <div>
    <Header />
    <UserAccount /> {/* Основной компонент пользователя */}
    <Footer /> {/* Добавляем Footer */}
  </div>,
  document.getElementById('root')
);
