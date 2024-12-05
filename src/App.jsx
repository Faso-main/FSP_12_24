import { useState } from 'react';
import './App.css';
import SignInForm from './SignIn';  // Убедитесь, что путь правильный
import SignUpForm from './SignUp';   // Убедитесь, что путь правильный

function App() {
  const [type, setType] = useState("signIn");

  const handleOnClick = (formType) => {
    setType(formType);
  };

  return (
    <>
      <div className="container">
        {type === "signIn" ? <SignInForm /> : <SignUpForm />}
        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-left">
              <h1>Добро пожаловать!</h1>
              <p>Введите свои персональные данные</p>
              <button
                className="ghost"
                id="signIn"
                onClick={() => handleOnClick("signIn")}
              >
                Войти
              </button>
            </div>
            <div className="overlay-panel overlay-right">
              <h1>Привет, Друг!</h1>
              <p>Пожалуйста, зарегистрируйтесь</p>
              <button
                className="ghost"
                id="signUp"
                onClick={() => handleOnClick("signUp")}
              >
                Зарегистрироваться
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
