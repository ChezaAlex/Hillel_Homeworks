import React from 'react'
import Row from './components/Row'
import '../../App.css'

export default function Table({todoList, updateStatus, changeFilter, deleteTodo, updateTitle, }) {
  return (
    <>
        <div className='row'>
          <button onClick= {(e)=>changeFilter(e)} className='all'>All</button>
          <button onClick= {(e)=>changeFilter(e)} className='pending'>Pending</button>
          <button onClick= {(e)=>changeFilter(e)} className='completed'>Completed</button>
        </div>
      <thead>
         <th></th>
         <th>Name</th>
         <th>Status</th>
         <th>Action</th>
      </thead>
      <tbody>
        {todoList.length ? 
          todoList.map((el, id)=> 
          <Row 
            row = {el} 
            key = {el.id}
            updateStatus = {updateStatus} 
            deleteTodo ={deleteTodo}
            updateTitle={updateTitle}
            />) 
            : null}
      </tbody>
    </>
  )
}
