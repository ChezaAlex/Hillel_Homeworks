  import React, { useState, useEffect, useContext } from 'react';
  import { Link } from 'react-router-dom';
  import logo from '../../img/logo.png';
  import shoppingCart from '../../img/shopping-cart.png';
  import './style.sass';
  import { CartContext } from './context';

  export default function Header() {
    const [user, setUser] = useState(null);
    const [numb, setNumb] = useState(0);
    const { cartItems } = useContext(CartContext);

    useEffect(() => {
      const userFromLocalStorage = localStorage.getItem('user');
      if (userFromLocalStorage) {
        setUser(JSON.parse(userFromLocalStorage));
      }
    }, []);

    useEffect(() => {
      setNumb(cartItems.length);
    }, [cartItems]);

    const handleLogOut = () => {
      localStorage.removeItem('user');
      window.location.reload(); // Reload the page after clearing localStorage
    };

    useEffect(() => {
      const handleStorageChange = (event) => {
        if (event.key === 'cartItems') {
          const cartItems = JSON.parse(event.newValue);
          if (cartItems) {
            setNumb(cartItems.length);
          }
        }
      };

      window.addEventListener('storage', handleStorageChange);

      return () => {
        window.removeEventListener('storage', handleStorageChange);
      };
    }, []);

    return (
      <div className='header'>
        <Link to='/'>
          <img src={logo} alt='' id='logo' />
        </Link>
        <div id='log'>
          <div className='LogIn'>
            {user ? (
              <Link to='/forms' className='logInText'>Hi, {user.name}!</Link>
            ) : (
              <Link to='/forms' className='logInText'>Log in</Link>
            )}
          </div>
          <img src={shoppingCart} alt='' id='cartImage' />
          {numb > 0 && <span className='cartItemCount'>{numb}</span>}
          {user && (
            <span onClick={handleLogOut} className='logOut'>
              Log Out
            </span>
          )}
        </div>
      </div>
    );
  }
