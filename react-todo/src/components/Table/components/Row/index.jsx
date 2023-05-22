  import React, { useState, useRef } from 'react'
  import Button from '../../../Common/Button'
  import '../../../../App.css'
  export default function Row({row, updateStatus, deleteTodo, updateTitle}) {
    const [edit, setEdit] = useState(false)
    const inputRef = useRef(null)

    const updateInput = () =>{
      setEdit(!edit)
      updateTitle({...row, title: inputRef.current.value})
    }
    return (
      <tr className='row'>
          <input type="checkbox" onClick={() =>updateStatus(row)} defaultChecked ={row.completed}/>
          {edit ?
          <td><input type ='text' ref={inputRef}></input></td> :
          <td>{row.title}</td>
          }
          <td><Button color = {row.completed ? 'green':'red'} text = {row.completed ? 'completed' : 'pending'}/></td>
          <td>
            {edit ? 
            <Button className='Save' text = {'Save'} action={updateInput} style={{ background: 'blue', padding: 10 }}/> 
            : 

            <Button className='edit' text = {'Edit'} action={()=>setEdit(!edit)} style={{ background: 'blue', padding: 10 }}/>
            }
            <button className='delete' text ={'Edit'}  style={{background: 'red', padding: 10}}  onClick={() => deleteTodo(row.id)}>Delete</button>
          </td>
      </tr>
    )
  }
