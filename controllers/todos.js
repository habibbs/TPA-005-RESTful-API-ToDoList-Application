const todos = require('../models/todos');

module.exports.getAllTodos = (req, res) => {
    todos.find().then((err, todos) => {
        if (err) {
            res.json({
                message: 'ERROR 401',
            });
        }
        res.json({
            data: todos,
        });
    });
};

module.exports.getTodoById = (req, res) => {
    const id = req.params.id;
    todos.findById(id, (err, todo) => {
        if (err) {
            res.json({
                message: 'Error menehh wes angel',
                error: err,
            });
        }
        res.json({
            data: todo,
            message: 'success get todo by ID',
        });
    });
};

module.exports.addTodo = (req, res) => {
    const body = req.body;
    const todo = new todos({ name: body.name });

    todo.save().then(() => {
        res.json({
            message: 'Data berhasil disimpan',
        });
    });
};
