
  import { useEffect, useState } from 'react';
  import './App.css';
  import Table from './components/Table/index.jsx';
  import API from './services/api.js'
  import Form from './components/Form/Index';

  function App() {
    const [state, setState] = useState([]);
    const [dataToRender, setDataToRender] = useState([]);
    const [filter, setFilter] = useState('All');

    useEffect(() => {
      API.getTodos(setState).then((res) => setState([ ...res ]));
    }, []);

    useEffect(()=>{ 
      if(filter === 'Pending'){
        const pendings = state.filter(el=> !el.completed)
        setDataToRender([...pendings])
      }else if (filter === 'Completed'){
        const completed = state.filter(el=> el.completed)
        setDataToRender([...completed])
      }else{
        setDataToRender(state)
      }
    }, [state, filter])
    const updateStatus = (element) => {
      API.updateStatus(element).then((res) => {

        const stateToUpdate = state.reduce((acc, el) => {
          if (el.id === element.id) {

            acc.push(res);
            return acc;
          } else {

            acc.push(el);
            return acc;
          }
        }, []);
        setState([...stateToUpdate]);
      });
    };

    const createTitle = (title) => {
      API.createTitle(title).then((res) => {
        setState([...state, res]);
      });
    }

    const changeFilter = (value) =>{
        setFilter(value.target.textContent)
    }
    const deleteTodo = (id) =>{
      console.log(id)
      API.deleteTitle(id)
      const filtered = state.filter((el) => el.id!==id)
      setState([...filtered])
    }

    const updateTitle = (element) =>{
        API.updateTitle(element).then(res=>{
          const updateState = state.map(el =>{
             if(el.id === res.id){
               return res
            }else{
              return el
            }
          })
          setState([...updateState])
        })
    }

    return (
      <div className="App"> 
        <Form createTitle={createTitle}/>
        <Table 
          todoList={dataToRender} 
          changeFilter = {changeFilter}
          updateStatus={updateStatus} 
          deleteTodo = {deleteTodo}
          updateTitle={updateTitle}
        />
      </div>
    );
  }

  export default App;
