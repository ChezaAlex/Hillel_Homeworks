import React, { useState } from 'react';
import '../LogIn/style.sass'

export default function Index() {
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    const name = e.target.name.value.trim();
    const email = e.target.email.value.trim();
    const password = e.target.password.value.trim();
    const verifyPassword = e.target.verifyPassword.value.trim();

    if (password !== verifyPassword) {
      setError('Пароль не совпадает!');
      return;
    }

    fetch(`https://634e9f834af5fdff3a625f84.mockapi.io/users?email=${email}`)
      .then((response) => response.json())
      .then((users) => {
        if (users.length > 0) {
          setError(`Пользователь с адресом электронной почты ${email} уже существует!`);
          return;
        }

        fetch('https://634e9f834af5fdff3a625f84.mockapi.io/users', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name,
            email,
            password,
            status: true,
            orders: [],
            shoppingCart: [],
          }),
        })
          .then((response) => response.json())
          .then((user) => {
            localStorage.setItem('user', JSON.stringify(user));
            window.location.href = 'index.html';
          })
          .catch(() => {
            setError('Ошибка при создании пользователя.');
          });
      })
      .catch(() => {
        setError('Ошибка при проверке адреса электронной почты.');
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className={error ? 'classError' : 'error'}>{error}</div>
      <input type="text" placeholder="Name" name="name" />
      <br />
      <input type="email" placeholder="Email address" name="email" />
      <br />
      <input type="password" placeholder="Password" name="password" />
      <br />
      <input type="password" placeholder="Verify password" name="verifyPassword" />
      <br />
      <button type="submit" className="formSubmit">
        Create account
      </button>
    </form>
  );
}