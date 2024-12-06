// src/components/Footer.jsx
import React from 'react';
import './css/Header_Footer.css'; // Импортируем стили

function Footer() {
  return (
    <footer className="app-footer">
      <div className="footer-content">
        <div className="footer-column">
          <h3>ItFreelanser</h3>
          <p>О сервисе</p>
          <p>Услуги и цены</p>
          <p>Контакты</p>
        </div>
        <div className="footer-column">
          <h3>Помощь</h3>
          <p>Для исполнителя</p>
          <p>Для заказчика</p>
          <p>Служба поддержки</p>
        </div>
        <div className="footer-column">
          <h3>Документы</h3>
          <p>Соглашение с пользователем</p>
          <p>Правила оказания услуг</p>
          <p>Политика конфиденциальности</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
