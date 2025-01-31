const express = require("express");
const todoCtrl = require("../controllers/todo");

const router = express.Router();

router.post("/api/todo", todoCtrl.AddTodoCtrl);

router.patch("/api/todo/:id", todoCtrl.UpdateTodoCtrl);

router.delete("/api/todo/:id", todoCtrl.DeleteTodoCtrl);

router.get("/api/todos", todoCtrl.getTodosCtrl);

router.get("/api/todos/:id", todoCtrl.getCertainTodoCtrl);

module.exports = router;
