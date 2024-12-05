import React, { useState } from "react";

function SignUpForm() {
  const [state, setState] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (evt) => {
    const value = evt.target.value;
    setState({
      ...state,
      [evt.target.name]: value,
    });
  };

  const handleOnSubmit = async (evt) => {
    evt.preventDefault();

    const { username, email, password, confirmPassword } = state;

    if (password !== confirmPassword) {
      setErrorMessage("Пароли не совпадают!");
      return;
    }

    // Объект, который будет отправлен на бэк
    const userData = {
      username,
      email,
      password,
    };

    try {
      const response = await fetch("http://your-backend-url/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        throw new Error("Ошибка регистрации");
      }

      // Успешная регистрация, можно очистить форму
      alert("Вы успешно зарегистрированы!");
      setState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
    } catch (error) {
      setErrorMessage(error.message || "Произошла ошибка");
    }
  };

  return (
    <div className="form-container sign-up-container">
      <form onSubmit={handleOnSubmit}>
        <h1>Создать Аккаунт</h1>
        {errorMessage && <p className="error">{errorMessage}</p>}
        <input
          type="text"
          name="username"
          value={state.username}
          onChange={handleChange}
          placeholder="Ник"
        />
        <input
          type="email"
          name="email"
          value={state.email}
          onChange={handleChange}
          placeholder="Почта"
        />
        <input
          type="password"
          name="password"
          value={state.password}
          onChange={handleChange}
          placeholder="Пароль"
        />
        <input
          type="password"
          name="confirmPassword"
          value={state.confirmPassword}
          onChange={handleChange}
          placeholder="Подтвердить Пароль"
        />
        <button type="submit">Зарегистрироваться</button>
      </form>
    </div>
  );
}

export default SignUpForm;
