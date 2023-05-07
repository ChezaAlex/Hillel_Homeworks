  import React, { useState } from 'react'

  export default function InputComp() {
    const [data, setData] = useState([]);
    const [selectAll, setSelectAll] = useState(false);

    const handleAddData = (newTitle, newDescription) => {
      setData([...data, { title: newTitle, description: newDescription, completed: false }]);
    }

    const handleEditRow = (index) => {
      const newData = [...data];
      newData[index].title = prompt("Enter new title", newData[index].title);
      newData[index].description = prompt("Enter new description", newData[index].description);
      setData(newData);
    }

    const handleDeleteRow = (index) => {
      const newData = [...data];
      newData.splice(index, 1);
      setData(newData);
    }

    const handleSelectAll = (event) => {
      const isChecked = event.target.checked;
      const newData = data.map((item) => {
        return {
          ...item,
          completed: isChecked
        }
      });
      setData(newData);
      setSelectAll(isChecked);
    }

    const handleSelectRow = (event, index) => {
      const isChecked = event.target.checked;
      const newData = [...data];
      newData[index].completed = isChecked;
      setData(newData);
      setSelectAll(false);
    }

    return (
      <div>
        <form onSubmit={(event) => {
          event.preventDefault();
          const newTitle = event.target.elements.title.value;
          const newDescription = event.target.elements.description.value;
          handleAddData(newTitle, newDescription);
        }}>
          <input name="title" type="text" placeholder="ToDo Title" />
          <input name="description" type="text" placeholder="Description" /> 
          <button type="submit" className ="btnAdd">Добавить</button>
        </form>
        <table>
          <thead>
            <tr>
              <th><input type="checkbox" checked={selectAll} onChange={handleSelectAll} /></th>
              <th>Name</th>
              <th>Description</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index}>
                <td><input type="checkbox" checked={item.completed} onChange={(event) => handleSelectRow(event, index)} /></td>
                <td>{item.title}</td>
                <td>{item.description}</td>
                <td className={item.completed ? 'status-completed' : 'status-pending'}>
                  {item.completed ? 'completed' : 'pending'}
                </td>
                <td>
                  <button className='edit' onClick={() => handleEditRow(index)}>Edit</button>
                  <button className='delete' onClick={() => handleDeleteRow(index)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div> 
    )
  }

