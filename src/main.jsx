import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import './css/App.css';
import Header from './Header';
import UserProfile from './UserProfile'; // Импорт профиля пользователя

const root = ReactDOM.createRoot(document.getElementById('root'));

const Main = () => {

  const [isLoggedIn, setLoggedIn] = useState(false); // Состояние для отслеживания входа пользователя
  const [isFadingOut, setFadingOut] = useState(false); // Состояние дляFade Out анимации

  const handleLoginSuccess = () => {
    if (!isLoggedIn) {
      setFadingOut(true);
      setTimeout(() => {
        setLoggedIn(true);
        setFadingOut(false);
      }, 500); // Длительность анимации
    }
  };

  const handleLogout = () => {
    setFadingOut(true);
    setTimeout(() => {
      setLoggedIn(false);
      setFadingOut(false);
    }, 500); // Длительность анимации
  };

  return (
    <div className="main-container">
      <Helmet>
        <title>exported project</title>
      </Helmet>
      <Header onLoginSuccess={handleLoginSuccess} onLogout={handleLogout} />
      
      {/* Если пользователь не вошел, показываем основной контент */}
      {!isLoggedIn ? (
        <div className={`main-main ${isFadingOut ? 'fade-out' : 'fade-in'}`}>
          <img
            src="./src/external/ellipse11594-6s1x-1900h.png"
            alt="Ellipse11594"
            className="main-ellipse1"
          />
    
          <div className="main-content1">
            <div className="main-block1">
              <div className="main-frame8">
                <span className="main-text15">Ищите айти исполнителей?</span>
                <span className="main-text16">
                  Нанимайте отличных фрилансеров быстро. ItFreelancer поможет вам
                  нанять фрилансеров в любой момент.
                </span>
                <div className="main-frame9">
                  <span className="main-text17">Найти специалиста</span>
                </div>
              </div>
              <img
                src="./src/external/image1550-xn03-800h.png"
                alt="IMAGE1550"
                className="main-image"
              />
            </div>
            <div className="main-block2">
              <div className="main-content2">
                <span className="main-text18">Почему мы?</span>
                <div className="main-frame19">
                  <span className="main-text19">
                    <span className="main-text20">Экспертная база</span>
                    <span className="main-text21">
                      : Мы объединяем проверенных фрилансеров — от разработчиков и
                      дизайнеров до аналитиков и инженеров.
                    </span>
                    <br/>
                    <span className="main-text25">Удобство и прозрачность</span>
                    <span className="main-text26">
                      : Простая навигация, безопасные сделки и чёткие инструменты
                      управления проектами.
                    </span>
                    <br/>
                    <span className="main-text29">Интеллектуальный подбор</span>
                    <span className="main-text30">
                      : Система сама предложит вам наиболее подходящих
                      исполнителей.
                    </span>
                    <br/>
                    <span className="main-text34">Эскроу-платежи</span>
                    <span>
                      : Ваши деньги в безопасности до завершения работы.
                    </span>
                  </span>
                </div>
              </div>
              <div className="main-interactive">
                <div className="main-frame33">
                  <div className="main-frame171">
                    <span className="main-text36">500+</span>
                    <span className="main-text37">Работадателей</span>
                  </div>
                </div>
                <div className="main-frame35">
                  <div className="main-frame18">
                    <span className="main-text38">500+</span>
                    <span className="main-text39">Задач опубликованно</span>
                  </div>
                </div>
                <div className="main-frame34">
                  <div className="main-frame172">
                    <span className="main-text40">500+</span>
                    <span className="main-text41">Исполнителей</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="main-block3">
              <div className="main-step1">
                <img
                  src="./src/external/image58110881819-kn6s-200w.png"
                  alt="IMAGE58110881819"
                  className="main-image58110881"
                />
                <span className="main-text42">Опишите свой проект</span>
                <span className="main-text43">
                  Создайте заказ, укажите требования и сроки
                </span>
              </div>
              <div className="main-step2">
                <img
                  src="./src/external/image341936818110-f4yk-200h.png"
                  alt="IMAGE341936818110"
                  className="main-image34193681"
                />
                <span className="main-text44">Выберите исполнителя</span>
                <span className="main-text45">
                  Найдите подходящего исполнителя по отзывам, рейтингу и портфолио
                </span>
              </div>
              <div className="main-step3">
                <img
                  src="./src/external/checked18111-5xa9-200w.png"
                  alt="checked18111"
                  className="main-checked1"
                />
                <span className="main-text46">Получите результат</span>
                <span className="main-text47">
                  Платите только за выполненную работу
                </span>
              </div>
            </div>
            <div className="main-block4">
              <div className="main-frame16">
                <span className="main-text48">
                  Идеальное место как для заказчиков, так и для исполнителей
                </span>
                <div className="main-frame29">
                  <div className="main-frame27">
                    <img
                      src="./src/external/image38123-3rkc-500h.png"
                      alt="IMAGE38123"
                      className="main-image3"
                    />
                    <span className="main-text49">Для заказчика</span>
                    <span className="main-text50">
                      Найдите специалистов, которые помогут вам сократить расходы
                      и реализовать проекты любой сложности.
                    </span>
                  </div>
                  <div className="main-frame28">
                    <img
                      src="./src/external/image2869-p91j-500h.png"
                      alt="IMAGE2869"
                      className="main-image2"
                    />
                    <span className="main-text51">Для исполнителя</span>
                    <span className="main-text52">
                      Получайте интересные заказы, работайте с надёжными клиентами
                      и развивайте свои навыки.
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="main-block5">
              <div className="main-line1">
                <div className="main-category1">
                  <img
                    src="./src/external/image91012867-9ycc-200h.png"
                    alt="IMAGE91012867"
                    className="main-image91012"
                  />
                  <span className="main-text53">Дизайн</span>
                  <span className="main-text54">
                    <span>
                      Веб-дизайн, Мобильный дизайн, Брендинг и логотипы,
                    </span>
                    <br />
                    <span>Графический дизайн и другое</span>
                  </span>
                </div>
                <div className="main-category2">
                  <img
                    src="./src/external/divcodingicon866-jdq-200h.png"
                    alt="divcodingicon866"
                    className="main-divcodingicon"
                  />
                  <span className="main-text58">Разработка</span>
                  <span className="main-text59">
                    Веб-разработка, Разработка мобильных приложений, Разработка
                    настольных приложений, Создание игр и другое
                  </span>
                </div>
                <div className="main-category3">
                  <img
                    src="./src/external/image2562004865-6k66-200h.png"
                    alt="IMAGE2562004865"
                    className="main-image2562004"
                  />
                  <span className="main-text60">Тестирование</span>
                  <span className="main-text61">Сайты, Мобайл, Софт</span>
                </div>
              </div>
              <div className="main-line2">
                <div className="main-category4">
                  <img
                    src="./src/external/image3780538864-mdcr-200h.png"
                    alt="IMAGE3780538864"
                    className="main-image3780538"
                  />
                  <span className="main-text62">Маркетинг</span>
                  <span className="main-text63">
                    SMM, SEO, Контекстная реклама и другое
                  </span>
                </div>
                <div className="main-category5">
                  <img
                    src="./src/external/freeiconai8637123863-xrir-200h.png"
                    alt="freeiconai8637123863"
                    className="main-freeiconai8637123"
                  />
                  <span className="main-text64">Искусственный интеллект</span>
                  <span className="main-text65">
                    <span>
                      Машинное обучение и глубокое обучение, Data engineering,
                    </span>
                    <br />
                    <span>Компьютерное зрение и другое</span>
                  </span>
                </div>
                <div className="main-category6">
                  <img
                    src="./src/external/image4230964862-drji-200h.png"
                    alt="IMAGE4230964862"
                    className="main-image4230964"
                  />
                  <span className="main-text69">Поддержка проекта</span>
                  <span className="main-text70">
                    <span>Управление проектами,</span>
                    <br />
                    <span>Scrum-мастера и Agile-коучинг,</span>
                    <br />
                    <span>Написание требований,</span>
                    <br />
                    <span>UX-исследования и другое</span>
                  </span>
                </div>
              </div>
              <div className="main-allcategories">
                <button className="main-button">
                  <span className="main-text78">Все категории</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        // Если пользователь вошел, показываем личный кабинет
        <div className={`fade-in`}>
          <UserProfile onLogout={handleLogout} />
        </div>
      )}
    </div>
  );
};

