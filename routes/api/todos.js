const express = require('express');
const router = express.Router();
const todosController = require('../../controllers/todos');

router.get('/', todosController.getAllTodos);
router.get('/:id', todosController.getTodoById);

module.exports = router;
