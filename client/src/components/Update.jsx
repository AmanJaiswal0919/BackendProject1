import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { updateTodo } from "../redux/reducer/todoSlice";
import axios from "axios";

function Update() {
    // find current todo
    const { id } = useParams();
    const todos = useSelector((state) => state.todos);
    const todo = todos.find(todo => todo._id === id)
  
    // insert default todo
  const [title, setTitle] = useState(todo ? todo.title : "");
  const [description, setDescription] = useState(todo ? todo.description : "");
  const navigate = useNavigate();
  const dispatch = useDispatch();


  async function EditTodo() {
    await axios
    .patch(`http://localhost:3000/todos/edit/${id}`, { title, description })
    .then((res) => {
      dispatch(updateTodo(res.data));
      navigate("/");
    });
}

return (
  <>
    <form action="" onSubmit={(e) => e.preventDefault()}>
      <input
        type="text"
        placeholder="enter title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="text"
        placeholder="enter description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button onClick={EditTodo}>Update</button>
    </form>
  </>
);
}

export default Update