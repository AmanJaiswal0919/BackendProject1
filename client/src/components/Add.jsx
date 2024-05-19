import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addTodo } from "../redux/reducer/todoSlice";

function Add() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  async function AddTodo() {
    await axios
      .post("http://localhost:3000/todos/create", { title, description })
      .then((res) => {
        dispatch(addTodo(res.data));
        navigate("/");
      });
  }

  return (
    <>
      <form action="" onSubmit={(e) => e.preventDefault()}>
        <input
          type="text"
          placeholder="enter title"
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="enter description"
          onChange={(e) => setDescription(e.target.value)}
        />
        <button onClick={AddTodo}>Add</button>
      </form>
    </>
  );
}

export default Add;
