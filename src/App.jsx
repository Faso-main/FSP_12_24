import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './css/UserAccount.css';

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

Order.propTypes = {
  description: PropTypes.string.isRequired,
  customer: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  deadline: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
};

function Review({ reviewText, reviewerName, date, rating }) {
  return (
    <div className="review">
      <div className="service-header">
        <img src="./src/assets/img/person_default.webp" alt="Reviewer" className="reviewer-image" />
        <div className="review-description">
          <p><strong>Отзыв:</strong> {reviewText}</p>
          <p><strong>Автор:</strong> {reviewerName}</p>
        </div>
        <div className="review-details">
          <p><strong>Дата:</strong> {date}</p>
          <div className="user-rating">
            {[...Array(5)].map((_, index) =>
              index < Math.floor(rating) ?
                <span key={index} className="star filled">★</span> :
                <span key={index} className="star">☆</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

Review.propTypes = {
  reviewText: PropTypes.string.isRequired,
  reviewerName: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  rating: PropTypes.number.isRequired,
};

function SocialLinks() {
  return {
    github: "https://github.com/Faso-main",
    telegram: "https://t.me/Faso312",
    vk: "https://vk.com/faso312",
  };
}

function UserProfile() {
  const [activeTab, setActiveTab] = useState('orders');

  const user = {
    name: "Имя Фамилия",
    age: "19",
    phone: "+7 (902) 749-59-42",
    email: "faso.312@yandex.ru",
    balance: "Баланс: 50000 ₽",
    orders: [
      {
        description: "Какое-то очень длинное описание для задачи 1",
        customer: "Клиент А",
        status: "Выполнен",
        deadline: "06.12.2024",
        price: "100000 ₽",
      },
      {
        description: "Какое-то очень длинное описание для задачи 2",
        customer: "Клиент Б",
        status: "В работе",
        deadline: "25.12.2024",
        price: "200000 ₽",
      },
    ],
    reviews: [
      {
        text: "Отличная работа, всё выполнено вовремя!",
        name: "Клиент А",
        date: "01.12.2024",
        rating: 5,
      },
      {
        text: "Рекомендую, высокий уровень профессионализма!",
        name: "Клиент Б",
        date: "15.11.2024",
        rating: 4,
      },
    ],
    transactions: [
      {
        type: "Вывод",
        code: "2200 2220 2200 2202",
        date: "01.12.2024",
        amount: "-5000 ₽",
      },
      {
        type: "Пополнение",
        code: "2200 2220 2200 2201",
        date: "15.11.2024",
        amount: "+20000 ₽",
      },
    ],
    services: [
      {
        name: "Услуга 1",
        description: "Какое-то очень краткое описание для услуги которую исполнитель сделает",
        price: "10000 ₽",
        images: [
          "./src/assets/img/offer1.jpg",
          "./src/assets/img/offer2.jpg",
          "./src/assets/img/offer3.jpg"
        ],
      },
      {
        name: "Услуга 2",
        description: "Какое-то очень краткое описание для услуги которую исполнитель сделает",
        price: "15000 ₽",
        images: [
          "./src/assets/img/offer1.jpg",
          "./src/assets/img/offer2.jpg",
          "./src/assets/img/offer3.jpg"
        ],
      },
    ],
    joinedYear: "2020",
    rating: 4,
    reviewsCount: 25,
  };

  const getUserOrders = () => (
    user.orders.length > 0 ? user.orders.map((order, index) => (
      <Order 
        key={index}
        {...order}
      />
    )) : <p>У вас нет выполненных заказов.</p>
  );

  const getUserReviews = () => (
    user.reviews.length > 0 ? user.reviews.map((review, index) => (
      <Review 
        key={index}
        reviewText={review.text}
        reviewerName={review.name}
        date={review.date}
        rating={review.rating}
      />
    )) : <p>У вас нет отзывов.</p>
  );

  const renderWallet = () => (
    <div>
      <div className="container_ cont_left">
        <h1 className='font_purple'>{user.balance}</h1>
      </div>
      <div className="container_ cont_left">
        <div className="transactions">
          <h2 className='margin_header'>Последние транзакции</h2>
          {user.transactions.map((transaction, index) => (
            <div key={index} className="transaction relation_flex">
              <div className="transaction-icon">
                <img className='trade_img' src={parseInt(transaction.amount) < 0 ? "./src/assets/img/perp2.png" : "./src/assets/img/perp3.png"} alt={transaction.type} />
              </div>
              <div style={{ flexGrow: 1 }}>
                <p><strong>Тип операции:</strong> {transaction.type}</p>
                <p><strong>Код операции:</strong> {transaction.code}</p>
              </div>
              <div className="transaction-details">
                <p><strong>Сумма:</strong> {transaction.amount}</p>
                <p><strong>Дата:</strong> {transaction.date}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderUserProfile = () => (
    <>
      <div className="container_ cont_left">
        <h2>Личный кабинет</h2>
        <div className="user-info">
          <p><strong>Возраст:</strong> <strong className='font_purple'>{user.age} лет</strong></p>
          <p><strong>Телефон:</strong> <strong className='font_purple'>{user.phone}</strong></p>
          <p><strong>Email:</strong> <strong className='font_purple'>{user.email}</strong></p>
        </div>
      </div>
      <div className="container_ cont_left">
        <h2>Связанные аккаунты</h2>
        <div className="user-info">
          {Object.entries(SocialLinks()).map(([key, link]) => (
            <p key={key}><strong>{key.charAt(0).toUpperCase() + key.slice(1)}:</strong> <strong><a className='font_purple' href={link} target="_blank" rel="noopener noreferrer">{link}</a></strong></p>
          ))}
        </div>
      </div>
    </>
  );

  const renderServices = () => (
    <div className="container_ cont_left">
      <h2>Мои услуги</h2>
      <div className="services">
        {user.services.map((service, index) => (
          <div key={index} className="service">
            <div className="service_header_service">
              <h3 className="service-name">{service.name}</h3>
              <p className="service-price"><strong>Цена:</strong> {service.price}</p>
            </div>
            <p>{service.description}</p>
            <div className="service-images service-header">
              {service.images.map((image, imgIndex) => (
                <img className='service_img' key={imgIndex} src={image} alt={`Service ${index + 1} image ${imgIndex + 1}`} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

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
            <p className='font_purple' onClick={() => setActiveTab('reviews')}>Мои отзывы</p>
          </div>
          <div className='inner_user_block'>
            <p className='font_purple'>Уведомления</p>
            <p className='font_purple'>Сообщения</p>
          </div>
          <div className='inner_user_block'>
            <p className='font_purple' onClick={() => setActiveTab('wallet')}>Кошелек</p>
          </div>
          <div className='inner_user_block'>
            <p className='font_purple'>Управление профилем</p>
          </div>
        </div>
      </div>

      <div>
        {activeTab === 'wallet' ? renderWallet() :
         activeTab === 'services' ? renderServices() :
         renderUserProfile()}

        {activeTab !== 'wallet' && activeTab !== 'services' && (
          <div className="container_ cont_left">
            <h2>{activeTab === 'orders' ? 'Заказы' : activeTab === 'reviews' ? 'Мои отзывы' : 'Резюме'}</h2>
            {activeTab === 'orders' ? (
              <div className="orders-container">
                {getUserOrders()}
              </div>
            ) : activeTab === 'reviews' ? (
              <div className="reviews-container">
                {getUserReviews()}
              </div>
            ) : (
              <div>{renderResume()}</div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function renderResume() {
  return (
    <div>
      <p><strong>Имя:</strong> Имя Фамилия</p>
      <p><strong>Контактная информация:</strong></p>
      <p>Email: <strong>example@example.com</strong></p>
      <p>Телефон: <strong>+7 (902) 749-59-42</strong></p>
      <p>Город: <strong>Город</strong></p>
      
      <h3>Общее описание</h3>
      <p>Я опытный [ваша профессия] с более чем [X лет] опытом работы в области [ваша сфера]. Обладаю навыками в [навыки]. Имею опыт работы с [технологии, инструменты].</p>
    </div>
  );
}

export default UserProfile;
