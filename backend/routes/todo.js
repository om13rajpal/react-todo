const todoRoute = require("express").Router();
const { todoModel } = require("../models/todo");
const { userModel } = require("../models/user");
const { todoSchema } = require("../zod-validations/todo");
const jwt = require("jsonwebtoken");

async function getTodos(req, res, next) {
  const userData = jwt.decode(req.headers.token);
  const username = userData.username;
  const user = await userModel.findOne({ username: username });
  const todos = user.todos;

  try {
    const data = todos
      .map(async function (todoId) {
        const todo = await todoModel.findOne({ _id: todoId });
        return todo
      })

      const todoArr = await Promise.all(data)
      

    res.json({
      status: true,
      message: "fetched todo successfully",
      todo: todoArr,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "some error occured could not fetch todo",
      error: error,
    });
    return;
  }
}

async function saveTodo(req, res, next) {
  const { title, description } = req.body;
  const data = {
    title,
    description,
  };

  const token = req.headers.token;
  if (!token) {
    res.status(503).json({ status: false, message: "token not found" });
  }

  const tokenData = jwt.decode(token);
  const username = tokenData.username;

  const validation = todoSchema.safeParse(data);

  if (!validation.success) {
    return res
      .status(400)
      .json({ status: false, message: "invalid data input", error });
    return;
  }

  const createTodo = await todoModel({ title, description });

  if (!createTodo) {
    res.status(500).json({ status: true, message: "server error occured" });
    return;
  }

  const saveTodo = await createTodo.save();
  if (!saveTodo) {
    res.status(500).json({
      status: false,
      message: "server error occured could not save todo",
    });
  }

  await userModel.findOneAndUpdate(
    {
      username: username,
    },
    {
      $push: { todos: saveTodo._id },
    }
  );

  res.json({ status: true, message: "todo saved" });
}

async function updateTodo(req, res, next) {
  const { id } = req.body;
  try {
    await todoModel.findOneAndUpdate(
      { _id: id },
      {
        isCompleted: true,
      }
    );
    res.json({ status: true, message: "todo completed" });
  } catch (error) {
    res.status(500).json({
      status: false,
      MessageEvent: "some error occured could not update todo",
    });
  }
}

todoRoute.get("/todos", getTodos);
todoRoute.post("/todo", saveTodo);
todoRoute.put("/updateTodo", updateTodo);

module.exports = {
  todoRoute,
};
