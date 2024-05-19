import mongoose, { Schema } from "mongoose";

const todoSchema = new Schema({
    title: String,
    description: String,

}, { timestamps: true })

export const Todo = mongoose.model("Todo", todoSchema)