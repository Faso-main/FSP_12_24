// src/components/Header.jsx
import React from 'react';
import './css/Header_footer.css'; // Создайте файл Header.css для стилей, если необходимо

function Header() {
  return (
    <header className="app-header">
      <h1 className="logo">ItFreelanser</h1>
      <nav className="navbar">
        <ul>
          <li><a href="#services">Услуги</a></li>
          <li><a href="#orders">Заказы</a></li>
          <li><a href="#reviews">Отзывы</a></li>
          <li><a href="#wallet">Кошелек</a></li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
