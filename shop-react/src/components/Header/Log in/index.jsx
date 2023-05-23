  import React from 'react'
  import { useState, useEffect } from 'react';
  export default function index() {
    const [user, setUser] = useState(null);

    useEffect(() => {
      const userFromLocalStorage = localStorage.getItem('user');
      if (userFromLocalStorage) {
        setUser(JSON.parse(userFromLocalStorage));
      }
    }, []);
    return (
      <div>
        {user ? (
          <p>Hi, {user.name}!</p>
        ) : (
          <a href="#" style={{color: 'white', textDecoration: 'none', paddingRight: '10px'}}>Log in</a>
        )}
      </div>
    )
  }
