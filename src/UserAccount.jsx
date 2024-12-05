import React from 'react';
import './css/UserAccount.css'; // Не забудьте создать CSS для стилей

function UserProfile() {
  const user = {
    name: "Имя Фамилия",
    phone: "+7 (902) 749-59-42",
    email: "faso.312@yandex.ru",
    orders: [
      { title: "Заказ 1", description: "Описание заказа 1", customer: "Клиент А", status: "Выполнен", price: "1000 ₽" },
      { title: "Заказ 2", description: "Описание заказа 2", customer: "Клиент Б", status: "В процессе", price: "2000 ₽" },
    ],
    joinedYear: "2020",
    rating: 4.5,
    reviewsCount: 25,
  };

  return (
    <div className="user-profile-container">
      <div className="user-profile-sidebar">
        <div className="user-icon">
          {/* Здесь будет иконка пользователя */}
          <img src="./assets/img/person_default.webp" alt="User Icon" />
        </div>
        <div className="user-details">
          <h2>{user.name}</h2>
          <p>С нами с {user.joinedYear}</p>
          <div className="user-rating">
            {[...Array(5)].map((_, index) =>
              index < Math.floor(user.rating) ? (
                <span key={index} className="star filled">★</span> // Заполненные звезды
              ) : (
                <span key={index} className="star">☆</span> // Пустые звезды
              )
            )}
            <span> ({user.reviewsCount} оценок)</span>
          </div>
        </div>
      </div>

      <div className="user-profile-main">
        <h1>Личный кабинет</h1>
        <div className="user-info">
          <p><strong>Имя:</strong> {user.name}</p>
          <p><strong>Телефон:</strong> {user.phone}</p>
          <p><strong>Email:</strong> {user.email}</p>
        </div>

        <div className="user-orders">
          <h2>Ваши Заказы</h2>
          {user.orders.length > 0 ? (
            <ul>
              {user.orders.map((order, index) => (
                <li key={index} className="order">
                  <h3>{order.title}</h3>
                  <p><strong>Описание:</strong> {order.description}</p>
                  <p><strong>Заказчик:</strong> {order.customer}</p>
                  <p><strong>Статус:</strong> {order.status}</p>
                  <p><strong>Сумма:</strong> {order.price}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p>У вас нет выполненных заказов.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
