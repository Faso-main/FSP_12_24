import React, { useState } from 'react';
import './css/Header_Footer.css';
import arrowDown from './assets/img/Arrow_down.png'; 
import logoImage from './assets/img/IT.png'; 
import SignInForm from './SignIn'; 
import Modal from './Modal'; // Импортируем модальное окно

function Header() {
  const [isCustomerDropdownOpen, setCustomerDropdownOpen] = useState(false);
  const [isExecutorDropdownOpen, setExecutorDropdownOpen] = useState(false);
  const [isSignInFormOpen, setSignInFormOpen] = useState(false);

  const handleSignInClick = () => {
    setSignInFormOpen(true);
    setCustomerDropdownOpen(false); 
    setExecutorDropdownOpen(false); 
  };

  return (
    <header className="app-header">
      <div style={{ marginLeft: '10%' }} className='relation_flex'>
        <img src={logoImage} alt="Logo" className="footer_logo" style={{ marginLeft: '10%' }} />
        <span className="font_header">ItFreelanser</span>
      </div>
      <nav className="navbar">
        <ul>
          <li>
            <div 
              className="dropdown" 
              onClick={() => setCustomerDropdownOpen(!isCustomerDropdownOpen)}
            >
              <span className="dropdown-title">Заказчик</span>
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
              <span className="dropdown-title">Исполнитель</span>
              <img src={arrowDown} alt="Arrow Down" className="dropdown-arrow" />
            </div>
            {isExecutorDropdownOpen && (
              <ul className="dropdown-menu">
                <li><a className='font_14' href="#executor-services">Услуги</a></li>
                <li><a href="#executor-portfolio">Портфолио</a></li>
              </ul>
            )}
          </li>
          <li>
            <button className="sign-in-button" onClick={handleSignInClick}>
              Войти
            </button>
          </li>
        </ul>
      </nav>
      <Modal isOpen={isSignInFormOpen} onClose={() => setSignInFormOpen(false)}>
        <SignInForm onClose={() => setSignInFormOpen(false)} />
      </Modal>
    </header>
  );
}

export default Header;
