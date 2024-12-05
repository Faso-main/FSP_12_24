import React, { useState } from 'react';
import './css/UserAccount.css'; // Убедитесь, что файл CSS существует

function Order({ description, customer, status, deadline, price }) {
  return (
    <div className="order">
      <div>
        <p><strong>Описание:</strong> {description}</p>
      </div>
      <div className='relation_flex justify_between'>
        <p><strong>Статус:</strong> {status}</p>
        <p><strong>Заказчик:</strong> {customer}</p>
        <p><strong>Сумма:</strong> {price}</p>
        <p><strong>Срок сдачи:</strong> {deadline}</p>
      </div>
    </div>
  );
}

class SocialLinks {
  constructor() {
    this.links = {
      github: "https://github.com/Faso-main",
      telegram: "https://t.me/Faso312",
      vk: "https://vk.com/faso312"
    };
  }
}

function UserProfile() {
  const [activeTab, setActiveTab] = useState('orders'); // Состояние активной вкладки
  const user = {
    name: "Имя Фамилия",
    age: "19",
    phone: "+7 (902) 749-59-42",
    email: "faso.312@yandex.ru",
    orders: [
      {
        description: "Какое-то очень длинное описание для задачи 1",
        customer: "Клиент А",
        status: "Выполнен",
        deadline: "06.12.2024",
        price: "100000 ₽"
      },
      {
        description: "Какое-то очень длинное описание для задачи 2",
        customer: "Клиент Б",
        status: "В работе",
        deadline: "25.12.2024",
        price: "200000 ₽"
      }
    ],
    joinedYear: "2020",
    rating: 4,
    reviewsCount: 25,
  };

  // Обработчик ошибок для получения заказов
  const getUserOrders = () => {
    if (!user.orders || user.orders.length === 0) {
      return "У вас нет выполненных заказов.";
    }
    return user.orders.map((order, index) => (
      <Order 
        key={index}
        description={order.description}
        customer={order.customer}
        status={order.status}
        deadline={order.deadline}
        price={order.price}
      />
    ));
  };

  // Контент для резюме
  const resumeContent = (
    <div>
      <p><strong>Имя:</strong> Имя Фамилия</p>
      <p><strong>Контактная информация:</strong></p>
      <p>Email: <strong>example@example.com</strong></p>
      <p>Телефон: <strong>+7 (902) 749-59-42</strong></p>
      <p>Город: <strong>Город</strong></p>
      
      <h3>Общее описание</h3>
      <p>Я опытный [ваша профессия] с более чем [X лет] опытом работы в области [ваша сфера]. Обладаю навыками в [навыки]. Имею опыт работы с [технологии, инструменты].</p>
      
      <h3>Образование</h3>
      <ul>
        <li>
          <strong>[Степень]</strong> в [Направление], [Название учебного заведения], [Год окончания]
        </li>
      </ul>
      
      <h3>Дополнительная информация</h3>
      <p>Есть опыт работы с [технологиями или методологиями], активно интересуюсь [темы интереса]. Готов работать в [тип работы или среды].</p>
    </div>
  );

  const socialLinks = new SocialLinks();

  return (
    <div className="profile_container">
      <div className="cont_user container_">
        <div className="user-icon">
          <img src="./src/assets/img/person_default.webp" alt="User Icon" />
        </div>
        <div className="user-details">
          <h2>{user.name}</h2>
          <p className='low_margin text_center'>На сервисе с {user.joinedYear}г.</p>
          <div className="user-rating">
            <span className='font_14'> ({user.reviewsCount} оценок)</span>
            {[...Array(5)].map((_, index) =>
              index < Math.floor(user.rating) ? 
                <span key={index} className="star filled">★</span> : 
                <span key={index} className="star">☆</span>
            )}
          </div>
          <div className='inner_user_block'>
            <p className='font_purple' onClick={() => setActiveTab('services')}>Мои услуги</p>
            <p className='font_purple' onClick={() => setActiveTab('orders')}>Заказы</p>
            <p className='font_purple' onClick={() => setActiveTab('resume')}>Резюме</p>
            <p className='font_purple'>Мои ответы</p>
          </div>
          <div className='inner_user_block'>
            <p className='font_purple'>Уведомления</p>
            <p className='font_purple'>Сообщения</p>
          </div>
          <div className='inner_user_block'>
            <p className='font_purple'>Кошелек</p>
          </div>
          <div className='inner_user_block'>
            <p className='font_purple'>Управление профилем</p>
          </div>
        </div>
      </div>
      <div>
        <div className="container_ cont_left">
          <h2>Личный кабинет</h2>
          <div className="user-info">
            <p><strong>Возраст:</strong><strong className='font_purple'> {user.age} лет</strong></p>
            <p><strong>Телефон:</strong><strong className='font_purple'> {user.phone}</strong></p>
            <p><strong>Email:</strong><strong className='font_purple'> {user.email}</strong></p>
          </div>
        </div>
        <div className="container_ cont_left">
          <h2>Связанные аккаунты</h2>
          <div className="user-info">
            <p><strong>Github:</strong><strong className='font_purple'> <a href={socialLinks.links.github} target="_blank" rel="noopener noreferrer">{socialLinks.links.github}</a></strong></p>
            <p><strong>Telegram:</strong><strong className='font_purple'> <a href={socialLinks.links.telegram} target="_blank" rel="noopener noreferrer">{socialLinks.links.telegram}</a></strong></p>
            <p><strong>VK:</strong><strong className='font_purple'> <a href={socialLinks.links.vk} target="_blank" rel="noopener noreferrer">{socialLinks.links.vk}</a></strong></p>
          </div>
        </div>
        <div className="user-orders container_ cont_left">
          <h2>{activeTab === 'orders' ? 'Заказы' : 'Резюме'}</h2>
          {activeTab === 'orders' ? (
            <div className="orders-container">
              {getUserOrders()}
            </div>
          ) : (
            resumeContent // Показываем контент резюме если активная вкладка 'resume'
          )}
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
