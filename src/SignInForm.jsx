import React from "react";

function SignInForm({ onLoginSuccess }) {
  const [state, setState] = React.useState({
    email: "",
    password: "",
  });
  const [message, setMessage] = React.useState(""); // Состояние для хранения сообщения 

  const handleChange = (evt) => {
    const value = evt.target.value;
    setState({
      ...state,
      [evt.target.name]: value,
    });
  };

  const handleOnSubmit = (evt) => {
    evt.preventDefault();
    const { email, password } = state;

    // Простая логика для проверки авторизации
    if (email === "faso.312@yandex.ru" && password === "pass") {
      setMessage("Успешная авторизация!"); // Успешное сообщение
      onLoginSuccess(); // Вызываем функцию для обновления состояния родительского компонента
    } else {
      setMessage("Неверный email или пароль!"); // Сообщение о неудаче
    }

    // Очищаем форму
    setState({
      email: "",
      password: "",
    });
    
    // Удалить сообщение через 3 секунды
    setTimeout(() => setMessage(""), 3000);
  };

  return (
    <div>
      <form onSubmit={handleOnSubmit}>
        <h1>Войти</h1>
        <span>или используйте свои личные данные</span>
        <input
          type="email"
          placeholder="Email"
          name="email"
          value={state.email}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Пароль"
          value={state.password}
          onChange={handleChange}
        />
        <a href="#">Забыли пароль?</a>
        <button type="submit">Войти</button>
      </form>
      {message && <div className="message">{message}</div>} {/* Показываем сообщение */}
    </div>
  );
}

export default SignInForm;