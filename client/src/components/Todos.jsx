import axios from "axios";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link} from "react-router-dom"
import { deleteTodo } from "../redux/reducer/todoSlice";

function Todos() {
  const todos = useSelector(state => state.todos)
  const dispatch = useDispatch()

  async function handleDelete(id){
    const response = await axios.get(`http://localhost:3000/todo/delete/${id}`)
    dispatch(deleteTodo(response.data))
  }

  return <>
  <Link to="/add">Add Todo</Link>
  <div>
  { todos ?
      todos.map((data)=>(
        <div key={data._id}>
          <div>{data.title}</div>
          <div>{data.description}</div>
          <Link to={`edit/${data._id}`}>Edit</Link>
          <button onClick={()=> handleDelete(data._id)}>Delete</button>
        </div>
      ))
      : "no data found"
    }
  </div>
  </>;
}

export default Todos;