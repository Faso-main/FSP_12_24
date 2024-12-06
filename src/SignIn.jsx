import React from "react";

function SignInForm({ onClose }) { 
  const [state, setState] = React.useState({
    email: "",
    password: "",
  });

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
    alert(`Вы вошли, используя email: ${email} и пароль: ${password}`);
    setState({
      email: "",
      password: "",
    });
    onClose();
  };

  return (
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
  );
}

export default SignInForm;
