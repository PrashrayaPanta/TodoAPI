const express = require("express");
const todoCtrl = require("../controllers/todo");

const router = express.Router();

const upload = require("../config/multer");

router.post("/api/todo", upload.array("images", 3), todoCtrl.AddTodoCtrl);

router.patch("/api/todo/:id", todoCtrl.UpdateTodoCtrl);

router.delete("/api/todo/:id", todoCtrl.DeleteTodoCtrl);

router.get("/api/todos", todoCtrl.getTodosCtrl);

router.get("/api/todos/:id", todoCtrl.getCertainTodoCtrl);

module.exports = router;
