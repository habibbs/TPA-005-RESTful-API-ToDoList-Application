const express = require('express');
const router = express.Router();
const todosController = require('../../controllers/todos');

router.get('/', todosController.getAllTodos);
router.get('/:id', todosController.getTodoById);
router.post('/', todosController.addTodo);
router.delete('/:id', todosController.deleteTodoById);
router.put('/:id', todosController.updateTodoById);
router.delete('/', todosController.deleteAllTodo);

module.exports = router;
