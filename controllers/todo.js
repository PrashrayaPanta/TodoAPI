const asyncHandler = require("express-async-handler");

const Todo = require("../model/todo");

const todoCtrl = {
  //!Register

  AddTodoCtrl: asyncHandler(async (req, res) => {
    // res.json({ message: "add Todo" });

    // const title = req.body.title;

    // const description = req.body.description;

    // console.log(title, description);

    const { title, description } = req.body;

    // console.log(title, description);

    const todoCraeted = await Todo.create(req.body);

    res.json({
      message: "Todo Created succesfully",
      title: todoCraeted.title,
      description: todoCraeted.description,
    });
  }),

  //!Login

  UpdateTodoCtrl: asyncHandler(async (req, res) => {
    // res.json({message:"Login"})

    const { id } = req.params;

    const { title, description } = req.body;

    const itemafterupdate = await Todo.findByIdAndUpdate(id, {
      title,
      description,
    });

    // console.log(itemafterupdate);

    if (!itemafterupdate) {
      return res.json({ message: "No object to update" });
    }

    res.json({ message: "Update Todo Ctrl", itemafterupdate });
  }),

  DeleteTodoCtrl: asyncHandler(async (req, res) => {
    // res.json({ message: "Delte Todo" });

    const { id } = req.params;

    const deleteditem = await Todo.findByIdAndDelete(id);

    res.json({ message: "Deleted Todo ", deleteditem });

    // console.log(deleteditem);
  }),

  getTodosCtrl: asyncHandler(async (req, res) => {
    // res.json({ message: "get Todo" });

    const todos = await Todo.find();

    // console.log(todos);

    // console.log(todos);

    if (todos.length <= 0) {
      return res.json({ messsgae: "No data in todo collection" });
    }

    res.json({ message: "There is data in server todos ", todos });
  }),

  getCertainTodoCtrl: asyncHandler(async (req, res) => {
    // res.json({ message: "get Certain Todo" });

    const { id } = req.params;

    // console.log(typeof id);

    // console.log(typeof id);

    // console.log(parseInt(id));

    const todo = await Todo.findById(id);

    // console.log(todo._id === id);

    // console.log(typeof todo._id);

    if (todo) {
      return res.json({ message: "Certain id data present", todos: todo });
    } else {
      res.json({ message: "no data" });
    }

    // console.log(todo);
  }),
};

module.exports = todoCtrl;
