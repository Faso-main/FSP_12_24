// Notification.jsx
import React from 'react';
import './css/Notification.css'; // Создайте CSS, если требуется

function Notification({ message, type, onClose }) {
  return (
    <div className={`notification ${type}`} onClick={onClose}>
      {message}
    </div>
  );
}

export default Notification;
