// src/components/Modal.jsx
import React from 'react';
import './css/SignAll.css'; // Импортируем стили для модального окна

function Modal({ children, isOpen, onClose }) {
  if (!isOpen) return null; // Не рендерим модал, если isOpen равно false

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={onClose}>✖</button>
        {children}
      </div>
    </div>
  );
}

export default Modal;
