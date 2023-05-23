  import React from 'react'
  import logo from '../../img/logo.png'
  import shoppingCart from '../../img/shopping-cart.png'
  import LogIn from './Log in/index'
  import './style.sass'


  export default function index() {
    return (
      <div className='header'>
        <img src={logo} alt="" id='logo' />
        <div id = 'log'>
          <LogIn/>
          <img src={shoppingCart} id='cartImage'/>
        </div>
      </div>
    )
  }
