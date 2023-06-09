  import React from 'react'
  import LogIn from './LogIn/index.jsx'
  import Registration from './Registration/index.jsx'
  import './style.sass'

  export default function Body() {
    return (
      <div className ='logPage'>
          <div>
            <h2>Secure Sign In</h2>
            <p>For curent customers</p>
            <LogIn/>
          </div>
          <div>
            <h2>Quick Registration</h2>
            <p>For new customers</p>
            <Registration/>
          </div>
      </div>
    )
  }
