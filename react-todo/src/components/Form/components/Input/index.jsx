import React from 'react'
import '../../../../App.css'

export default function Input({ updateTitle, title }) {

  return (
    <input 
      type="text" 
      value={title} 
      onChange={(e) => updateTitle(e.target.value)}
      />
  )
}
