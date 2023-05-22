import React from 'react'
import '../../../App.css'

export default function Button({ color= "blue", action = () => {}, text}) {
  return (
    <button 
      style={{background: color, padding: 10, width: '100px'}} 
      onClick={action}
      className = 'btnAdd'
      >
      {text}
      </button>
  )
}
