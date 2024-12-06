import React, { useState, memo } from "react";


import "./scss/_resets.module.scss";
import  Ellipse1Icon  from "./Ellipse1Icon.jsx";
import "./scss/Main.module.scss";
import UserProfile from "./UserAccount.jsx"; // Импортируем наш компонент

const Main = memo(() => {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Состояние для управления входом пользователя

  const handleLoginClick = () => {
    setIsLoggedIn(true); // Устанавливаем состояние при входе
  };

  if (isLoggedIn) {
    return <UserProfile />; // Если пользователь вошел, отображаем личный кабинет
  }

  return (
    <div className={`${resets.clapyResets} ${classes.root}`}>
      <div className={classes.ellipse1}>
        <Ellipse1Icon className={classes.ellipse1__icon} />
      </div>
      <div className={classes.appBar}>
        <div className={classes.appBar__logo}>
          <div className={classes.appBar__logo__miniLogo}>
            <div className={classes.appBar__logo__miniLogo__if}>if</div>
          </div>
          <div className={classes.appBar__logo__itFreelancer}>ItFreelancer</div>
        </div>
        <div className={classes.appBar__rightMenu}>
          <div className={classes.appBar__rightMenu__fastMenu}>
            <div className={classes.appBar__rightMenu__fastMenu__frame3}>
              <div
                className={classes.appBar__rightMenu__fastMenu__frame3__unnamed}
              >
                Заказчику
              </div>
              <div
                className={classes.appBar__rightMenu__fastMenu__frame3___1}
              ></div>
            </div>
            <div className={classes.appBar__rightMenu__fastMenu__frame4}>
              <div
                className={
                  classes.appBar__rightMenu__fastMenu__frame4__unnamed2
                }
              >
                Исполнителю
              </div>
              <div
                className={
                  classes.appBar__rightMenu__fastMenu__frame4___12
                }
              ></div>
            </div>
          </div>
          <div className={classes.appBar__rightMenu__signIn}>
            <div
              className={classes.appBar__rightMenu__signIn__unnamed3}
              onClick={handleLoginClick} // Устанавливаем обработчик клика на кнопку "Войти"
            >
              Войти
            </div>
          </div>
        </div>
      </div>
      <div className={classes.content}>
        <div className={classes.content__block1}>
          <div className={classes.content__block1__frame8}>
            <div className={classes.content__block1__frame8__unnamed4}>
              Ищите айти исполнителей?
            </div>
            <div className={classes.content__block1__frame8__ItFreelancer}>
              Нанимайте отличных фрилансеров быстро. ItFreelancer поможет вам
              нанять фрилансеров в любой момент.
            </div>
            <div className={classes.content__block1__frame8__frame9}>
              <div
                className={classes.content__block1__frame8__frame9__unnamed5}
              >
                Найти специалиста
              </div>
            </div>
          </div>
          <div className={classes.content__block1__unnamed6}></div>
        </div>
        <div className={classes.content__block2}>
          <div className={classes.content__block2__content2}>
            <div className={classes.content__block2__content2__unnamed7}>
              Почему мы?
            </div>
            <div className={classes.content__block2__content2__frame19}>
              <div
                className={classes.content__block2__content2__frame19__unnamed8}
              >
                <p
                  className={
                    classes.content__block2__content2__frame19__unnamed8__labelWrapper
                  }
                >
                  <span
                    className={
                      classes.content__block2__content2__frame19__unnamed8__labelWrapper__label
                    }
                  >
                    Экспертная база
                  </span>
                  <span
                    className={
                      classes.content__block2__content2__frame19__unnamed8__labelWrapper__label2
                    }
                  >
                    : Мы объединяем проверенных фрилансеров — от разработчиков и
                    дизайнеров до аналитиков и инженеров.
                  </span>
                </p>
                <div
                  className={
                    classes.content__block2__content2__frame19__unnamed8__textBlock
                  }
                >
                  <p
                    className={
                      classes.content__block2__content2__frame19__unnamed8__textBlock__labelWrapper2
                    }
                  ></p>
                </div>
                <div
                  className={
                    classes.content__block2__content2__frame19__unnamed8__textBlock2
                  }
                >
                  <p
                    className={
                      classes.content__block2__content2__frame19__unnamed8__textBlock2__labelWrapper3
                    }
                  >
                    <span
                      className={
                        classes.content__block2__content2__frame19__unnamed8__textBlock2__labelWrapper3__label3
                      }
                    >
                      Удобство и прозрачность
                    </span>
                    <span
                      className={
                        classes.content__block2__content2__frame19__unnamed8__textBlock2__labelWrapper3__label4
                      }
                    >
                      : Простая навигация, безопасные сделки и чёткие
                      инструменты управления проектами.
                    </span>
                  </p>
                </div>
                <div
                  className={
                    classes.content__block2__content2__frame19__unnamed8__textBlock3
                  }
                >
                  <p
                    className={
                      classes.content__block2__content2__frame19__unnamed8__textBlock3__labelWrapper4
                    }
                  ></p>
                </div>
                <p
                  className={
                    classes.content__block2__content2__frame19__unnamed8__labelWrapper5
                  }
                >
                  <span
                    className={
                      classes.content__block2__content2__frame19__unnamed8__labelWrapper5__label5
                    }
                  >
                    Интеллектуальный подбор
                  </span>
                  <span
                    className={
                      classes.content__block2__content2__frame19__unnamed8__labelWrapper5__label6
                    }
                  >
                    : Система сама предложит вам наиболее подходящих
                    исполнителей.
                  </span>
                </p>
                <div
                  className={
                    classes.content__block2__content2__frame19__unnamed8__textBlock4
                  }
                >
                  <p
                    className={
                      classes.content__block2__content2__frame19__unnamed8__textBlock4__labelWrapper6
                    }
                  ></p>
                </div>
                <div
                  className={
                    classes.content__block2__content2__frame19__unnamed8__textBlock5
                  }
                >
                  <p
                    className={
                      classes.content__block2__content2__frame19__unnamed8__textBlock5__labelWrapper7
                    }
                  >
                    <span
                      className={
                        classes.content__block2__content2__frame19__unnamed8__textBlock5__labelWrapper7__label7
                      }
                    >
                      Эскроу-платежи
                    </span>
                    <span
                      className={
                        classes.content__block2__content2__frame19__unnamed8__textBlock5__labelWrapper7__label8
                      }
                    >
                      : Ваши деньги в безопасности до завершения работы.
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className={classes.content__block2__interactive}>
            <div className={classes.content__block2__interactive__frame33}>
              <div
                className={
                  classes.content__block2__interactive__frame33__frame17
                }
              >
                <div
                  className={
                    classes.content__block2__interactive__frame33__frame17___500
                  }
                >
                  500+
                </div>
                <div
                  className={
                    classes.content__block2__interactive__frame33__frame17__unnamed9
                  }
                >
                  Работадателей
                </div>
              </div>
            </div>
            <div className={classes.content__block2__interactive__frame35}>
              <div
                className={
                  classes.content__block2__interactive__frame35__frame18
                }
              >
                <div
                  className={
                    classes.content__block2__interactive__frame35__frame18___5002
                  }
                >
                  500+
                </div>
                <div
                  className={
                    classes.content__block2__interactive__frame35__frame18__unnamed10
                  }
                >
                  Задач опубликованно
                </div>
              </div>
            </div>
            <div className={classes.content__block2__interactive__frame34}>
              <div
                className={
                  classes.content__block2__interactive__frame34__frame172
                }
              >
                <div
                  className={
                    classes.content__block2__interactive__frame34__frame172___5003
                  }
                >
                  500+
                </div>
                <div
                  className={
                    classes.content__block2__interactive__frame34__frame172__unnamed11
                  }
                >
                  Исполнителей
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={classes.content__block3}>
          <div className={classes.content__block3__start}></div>
          <div className={classes.content__block3__step1}>
            <div className={classes.content__block3__step1___58110881}></div>
            <div className={classes.content__block3__step1__unnamed12}>
              Опишите свой проект
            </div>
            <div className={classes.content__block3__step1__unnamed13}>
              Создайте заказ, укажите требования и сроки
            </div>
          </div>
          <div className={classes.content__block3__step2}>
            <div className={classes.content__block3__step2___34193681}></div>
            <div className={classes.content__block3__step2__unnamed14}>
              Выберите исполнителя
            </div>
            <div className={classes.content__block3__step2__unnamed15}>
              Найдите подходящего исполнителя по отзывам, рейтингу и портфолио
            </div>
          </div>
          <div className={classes.content__block3__step3}>
            <div className={classes.content__block3__step3__checked1}></div>
            <div className={classes.content__block3__step3__unnamed16}>
              Получите результат
            </div>
            <div className={classes.content__block3__step3__unnamed17}>
              Платите только за выполненную работу
            </div>
          </div>
          <div className={classes.content__block3__end}></div>
        </div>
        <div className={classes.content__block4}>
          <div className={classes.content__block4__frame16}>
            <div className={classes.content__block4__frame16__unnamed18}>
              Идеальное место как для заказчиков, так и для исполнителей
            </div>
            <div className={classes.content__block4__frame16__frame29}>
              <div
                className={classes.content__block4__frame16__frame29__frame27}
              >
                <div
                  className={
                    classes.content__block4__frame16__frame29__frame27___3
                  }
                ></div>
                <div
                  className={
                    classes.content__block4__frame16__frame29__frame27__unnamed19
                  }
                >
                  Для заказчика
                </div>
                <div
                  className={
                    classes.content__block4__frame16__frame29__frame27__unnamed20
                  }
                >
                  Найдите специалистов, которые помогут вам сократить расходы и
                  реализовать проекты любой сложности.
                </div>
              </div>
              <div
                className={classes.content__block4__frame16__frame29__frame28}
              >
                <div
                  className={
                    classes.content__block4__frame16__frame29__frame28___2
                  }
                ></div>
                <div
                  className={
                    classes.content__block4__frame16__frame29__frame28__unnamed21
                  }
                >
                  Для исполнителя
                </div>
                <div
                  className={
                    classes.content__block4__frame16__frame29__frame28__unnamed22
                  }
                >
                  Получайте интересные заказы, работайте с надёжными клиентами и
                  развивайте свои навыки.
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={classes.content__block5}>
          <div className={classes.content__block5__line1}>
            <div className={classes.content__block5__line1__category1}>
              <div
                className={classes.content__block5__line1__category1___91012}
              ></div>
              <div
                className={classes.content__block5__line1__category1__unnamed23}
              >
                Дизайн
              </div>
              <div
                className={classes.content__block5__line1__category1__unnamed24}
              >
                <div
                  className={
                    classes.content__block5__line1__category1__unnamed24__textBlock6
                  }
                >
                  Веб-дизайн, Мобильный дизайн, Брендинг и логотипы,
                </div>
                <div
                  className={
                    classes.content__block5__line1__category1__unnamed24__textBlock7
                  }
                >
                  Графический дизайн и другое
                </div>
              </div>
            </div>
            <div className={classes.content__block5__line1__category2}>
              <div
                className={
                  classes.content__block5__line1__category2__divCodingIcon
                }
              ></div>
              <div
                className={
                  classes.content__block5__line1__category2__unnamed25
                }
              >
                Разработка
              </div>
              <div
                className={
                  classes.content__block5__line1__category2__unnamed26
                }
              >
                Веб-разработка, Разработка мобильных приложений, Разработка
                настольных приложений, Создание игр и другое
              </div>
            </div>
            <div className={classes.content__block5__line1__category3}>
              <div
                className={classes.content__block5__line1__category3___2562004}
              ></div>
              <div
                className={classes.content__block5__line1__category3__unnamed27}
              >
                Тестирование
              </div>
              <div
                className={classes.content__block5__line1__category3__unnamed28}
              >
                Сайты, Мобайл, Софт
              </div>
            </div>
          </div>
          <div className={classes.content__block5__line2}>
            <div className={classes.content__block5__line2__category4}>
              <div
                className={classes.content__block5__line2__category4___3780538}
              ></div>
              <div
                className={classes.content__block5__line2__category4__unnamed29}
              >
                Маркетинг
              </div>
              <div
                className={classes.content__block5__line2__category4__sMMSEO}
              >
                SMM, SEO, Контекстная реклама и другое
              </div>
            </div>
            <div className={classes.content__block5__line2__category5}>
              <div
                className={
                  classes.content__block5__line2__category5__freeIconAi8637123
                }
              ></div>
              <div
                className={classes.content__block5__line2__category5__unnamed30
              }>
                Искусственный интеллект
              </div>
              <div
                className={
                  classes.content__block5__line2__category5__DataEngineering
                }
              >
                <div
                  className={
                    classes.content__block5__line2__category5__DataEngineering__textBlock8
                  }
                >
                  Машинное обучение и глубокое обучение,Data engineering,
                </div>
                <div
                  className={
                    classes.content__block5__line2__category5__DataEngineering__textBlock9
                  }
                >
                  Компьютерное зрение и другое
                </div>
              </div>
            </div>
            <div className={classes.content__block5__line2__category6}>
              <div
                className={classes.content__block5__line2__category6___4230964}
              ></div>
              <div
                className={classes.content__block5__line2__category6__unnamed31}
              >
                Поддержка проекта
              </div>
              <div
                className={
                  classes.content__block5__line2__category6__ScrumAgileUX
                }
              >
                <div
                  className={
                    classes.content__block5__line2__category6__ScrumAgileUX__textBlock10
                  }
                >
                  Управление проектами,
                </div>
                <div
                  className={
                    classes.content__block5__line2__category6__ScrumAgileUX__textBlock11
                  }
                >
                  Scrum-мастера и Agile-коучинг,
                </div>
                <div
                  className={
                    classes.content__block5__line2__category6__ScrumAgileUX__textBlock12
                  }
                >
                  Написание требований,
                </div>
                <div
                  className={
                    classes.content__block5__line2__category6__ScrumAgileUX__textBlock13
                  }
                >
                  UX-исследования и другое
                </div>
              </div>
            </div>
          </div>
          <div className={classes.content__block5__allCategories}>
            <button className={classes.content__block5__allCategories__button}>
              <div
                className={
                  classes.content__block5__allCategories__button__unnamed32
                }
              >
                Все категории
              </div>
            </button>
          </div>
        </div>
      </div>
      <div className={classes.bottom}>
        <div className={classes.bottom__botMenu}>
          <div className={classes.bottom__botMenu__about}>
            <div className={classes.bottom__botMenu__about__itFreelancer2}>
              ItFreelancer
            </div>
            <div className={classes.bottom__botMenu__about__frame25}>
              <div
                className={classes.bottom__botMenu__about__frame25__unnamed33}
              >
                О Сервисе
              </div>
              <div
                className={classes.bottom__botMenu__about__frame25__unnamed34}
              >
                Услуги и цены
              </div>
              <div
                className={classes.bottom__botMenu__about__frame25__unnamed35}
              >
                Контакты
              </div>
            </div>
          </div>
          <div className={classes.bottom__botMenu__help}>
            <div className={classes.bottom__botMenu__help__unnamed36}>
              Помощь
            </div>
            <div className={classes.bottom__botMenu__help__frame252}>
              <div
                className={classes.bottom__botMenu__help__frame252__unnamed37}
              >
                <a
                  href="https://freelance.habr.com/help/freelancer"
                  target="_blank"
                  rel="noreferrer"
                  className={
                    classes.bottom__botMenu__help__frame252__unnamed37__textBlock14
                  }
                >
                  Для исполнителя
                </a>
              </div>
              <div
                className={classes.bottom__botMenu__help__frame252__unnamed38}
              >
                <a
                  href="https://freelance.habr.com/help/customer"
                  target="_blank"
                  rel="noreferrer"
                  className={
                    classes.bottom__botMenu__help__frame252__unnamed38__textBlock15
                  }
                >
                  Для заказчика
                </a>
              </div>
              <div
                className={classes.bottom__botMenu__help__frame252__unnamed39}
              >
                Служба поддержки
              </div>
            </div>
          </div>
          <div className={classes.bottom__botMenu__documents}>
            <div className={classes.bottom__botMenu__documents__unnamed40}>
              Документы
            </div>
            <div className={classes.bottom__botMenu__documents__frame253}>
              <div
                className={
                  classes.bottom__botMenu__documents__frame253__unnamed41
                }
              >
                Соглашение с пользователем
              </div>
              <div
                className={
                  classes.bottom__botMenu__documents__frame253__unnamed42
                }
              >
                Правила оказания услуг
              </div>
              <div
                className={
                  classes.bottom__botMenu__documents__frame253__unnamed43
                }
              >
                Политика конфиденциальности
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});


