import React, { useEffect } from 'react'
import {BrowserRouter,Routes, Route} from "react-router-dom"
import Add from './components/Add'
import axios from "axios";
import { useDispatch } from "react-redux"; 
import { getAllTodo } from './redux/reducer/todoSlice';
import Todos from './components/Todos';
import Update from './components/Update';
import './App.css'
function App() {
const dispatch = useDispatch();

useEffect(() => {
  (async function () {
    try {
      await axios
        .get("http://localhost:3000/todos")
        .then((response) => dispatch(getAllTodo(response.data)))
        .catch((err)=> console.log(`error while fetching the data : ${err}`))
    } catch (error) {
      console.log(error);
    }
  })();
}, []);

return (
  <>
  <BrowserRouter>
  <Routes>
    <Route path='/' element={<Todos/>}/>
    <Route path='add' element={<Add/>} />
    <Route path='edit/:id' element={<Update/>} />

  </Routes>
  </BrowserRouter>
  </>
)
}

export default App