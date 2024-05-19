import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    todos: [],
};

const todoSlice = createSlice({
    name: "todos",
    initialState,
    reducers: {
        getAllTodo: (state, action) => {
            state.todos = action.payload.data;
        },

        addTodo: (state, action) => {
            state.todos.push(action.payload.data);
        },

        deleteTodo: (state, action) => {
            const { _id } = action.payload.data;
            state.todos = state.todos.filter((todo) => todo._id !== _id);
        },

        updateTodo: (state, action) => {
            const { _id, title, description } = action.payload.data;
            let updateableTodo = null;
            updateableTodo = state.todos.find((todo) => todo._id === _id);
            if (updateableTodo) {
                updateableTodo.title = title;
                updateableTodo.description = description;
            }
        },
    },
});

export const { getAllTodo, addTodo, deleteTodo, updateTodo } =
todoSlice.actions;

export default todoSlice.reducer;