import express from 'express';
import cors from 'cors';
import { Todo } from './models/todo.model.js';
import mongoose from 'mongoose';
const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

await mongoose.connect(
  'mongodb+srv://amanjaiswal1909:ab123Data@cluster0.mjsmajf.mongodb.net/todoDatabase'
);

app.get('/todos', async (req, res) => {
  try {
    const todos = await Todo.find({});
    if (!todos.length) {
      return res.status(200).json({
        message: 'No data found',
      });
    }
    return res.status(200).json({
      data: todos,
      message: 'data found',
    });
  } catch (error) {
    return res.status(500).json({
      message: `Error while fetching the data :${error} `,
    });
  }
});

app.post('/todos/create', async (req, res) => {
  try {
    const { title, description } = req.body;

    if (!(title && description)) {
      return res.status(200).json({
        message: 'All field are required',
      });
    }
    const todo = await Todo.create({ title, description });
    return res.status(200).json({
      data: todo,
      message: 'Todo created successfully',
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Internal server error',
    });
  }
});

app.patch('/todos/edit/:id', async (req, res) => {
  const id = req.params.id;
  const { title, description } = req.body;

  const todo = await Todo.findByIdAndUpdate(
    id,
    {
      title,
      description,
    },
    { new: true }
  );

  res.status(200).json({
    data: todo,
    message: 'Todo edit successfully',
  });
});

app.get('/todo/delete/:id', async (req, res) => {
  const id = req.params.id;
  const response = await Todo.findByIdAndDelete(id);

  return res.status(200).json({
    data: response,
    message: 'Todo delete successfully',
  });
});

app.listen(3000, () => {
  console.log('listing on port 3000');
});