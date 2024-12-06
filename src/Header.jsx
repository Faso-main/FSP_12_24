// src/components/Header.jsx
import React, { useState } from 'react';
import './css/Header_Footer.css';
import './css/UserAccount.css';
import arrowDown from './assets/img/Arrow_down.png'; // Импортируем изображение стрелки

function Header() {
  const [isCustomerDropdownOpen, setCustomerDropdownOpen] = useState(false);
  const [isExecutorDropdownOpen, setExecutorDropdownOpen] = useState(false);

  return (
    <header className="app-header">
      <h1 className="logo">ItFreelanser</h1>
      <nav className="navbar">
        <ul>
          <li>
            <div 
              className="dropdown" 
              onClick={() => setCustomerDropdownOpen(!isCustomerDropdownOpen)}
            >
              <span>Заказчик</span>
              <img src={arrowDown} alt="Arrow Down" className="dropdown-arrow" />
            </div>
            {isCustomerDropdownOpen && (
              <ul className="dropdown-menu">
                <li><a className='font_14' href="#customer-orders">Заказы</a></li>
                <li><a href="#customer-reviews">Отзывы</a></li>
              </ul>
            )}
          </li>
          <li>
            <div 
              className="dropdown" 
              onClick={() => setExecutorDropdownOpen(!isExecutorDropdownOpen)}
            >
              <span>Исполнитель</span>
              <img src={arrowDown} alt="Arrow Down" className="dropdown-arrow" />
            </div>
            {isExecutorDropdownOpen && (
              <ul className="dropdown-menu">
                <li><a className='font_14' href="#executor-services">Услуги</a></li>
                <li><a href="#executor-portfolio">Портфолио</a></li>
              </ul>
            )}
          </li>
          <li><a href="#wallet">Кошелек</a></li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
