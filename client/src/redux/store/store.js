import { configureStore } from "@reduxjs/toolkit"
import todoSlice from "../reducer/todoSlice.js"


export const store = configureStore({
    reducer: todoSlice
})