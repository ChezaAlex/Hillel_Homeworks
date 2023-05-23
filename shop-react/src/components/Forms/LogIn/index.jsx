import React from 'react'
import { useState } from "react";
import './style.sass'

export default function index() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    const logJSONData = async (userId) => {
      let response = await fetch(`https://634e9f834af5fdff3a625f84.mockapi.io/users/${userId}`);
      let userObj = await response.json();
      localStorage.setItem("user", JSON.stringify(userObj));
    };

    fetch('https://634e9f834af5fdff3a625f84.mockapi.io/users')
      .then(response => response.json())
      .then(users => {
        const user = users.find(u => u.email === email);
        if (!user) {
          setError('Invalid email');
        } else if (user.password !== password) {
          setError('Invalid password');
        } else {
          fetch(`https://634e9f834af5fdff3a625f84.mockapi.io/users/${user.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ status: true })
          })
          .then(() => {
            window.location.href = 'index.html';
          })
          .catch(error => console.error(error));
          logJSONData(user.id);
        }
      })
      .catch(error => console.error(error));
  };
  
  return (
<form onSubmit={handleSubmit}>
      <div className={error ? 'classError' : 'error'}>{error}</div>
      <input
        type="email"
        required
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <br />
      <input
        type="password"
        required
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <br />
      <button type="submit" className="formSubmit">Sign in</button>
    </form>
  )
}
