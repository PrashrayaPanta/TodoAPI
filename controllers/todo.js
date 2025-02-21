const asyncHandler = require("express-async-handler");

const Todo = require("../model/todo");
const File = require("../model/File");

const todoCtrl = {
  //!Register

  AddTodoCtrl: asyncHandler(async (req, res) => {
    const { title, description } = req.body;

    if (!req.files || req.files.length === 0) {
      throw new Error("No file provided");
    }

    // console.log(req.files);

    // console.log(req.files.path);

    // console.log(req.files.path);

    const images = await Promise.all(
      req.files.map(async (file) => {
        //save the images into our database

        const newFile = new File({
          url: file.path,
          public_id: file.filename,
        });
        await newFile.save();
        return {
          url: newFile.url,
          public_id: newFile.public_id,
        };
      })
    );

    // console.log(images);

    const todoCraeted = await Todo.create({ title, description, images });

    res.json({
      message: "Todo Created succesfully",
      title: todoCraeted.title,
      description: todoCraeted.description,
      images: todoCraeted.images,
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
      // return res.json({ message: "No object to update" });
      throw new Error("id that are searching not found");
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

    if (todos.length <= 0) {
      // return res.json({ messsgae: "No data in todo collection" });
      throw new Error("No data in collection");
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
      throw new error("No data with that id");
    }

    // console.log(todo);
  }),
};

module.exports = todoCtrl;
