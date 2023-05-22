import React, {useState} from 'react'
import Input from './components/Input'
import Button from '../Common/Button'

export default function Form({ createTitle }) {


  const [title, setTitle] = useState('')

  const updateTitle = (value) => {
    setTitle(value)
  }

  const create = () => {
    setTitle('')
    createTitle(title)
  } 
  

  return (
   <div className="fromWrapper">
   <Input updateTitle={updateTitle} title={title}/>
   <Button action={create} text ={"add"}/>
   </div>
  )
}