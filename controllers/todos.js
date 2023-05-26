const todos = require('../models/todos');

module.exports.getAllTodos = (req, res) => {
    todos.find().then((result, err) => {
        if (err) {
            console.log(err);
            res.json({
                message: 'ERROR 401',
            });
        }
        res.status(200).json({
            data: result,
            message: 'berhasil menampilkan seluruh data',
        });
    });
};

module.exports.getTodoById = (req, res) => {
    const id = req.params.id;
    todos.findById(id, (result, err) => {
        if (err) {
            res.json({
                message: 'Error menehh wes angel',
            });
        }
        res.status(200).json({
            data: result,
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

module.exports.deleteTodoById = (req, res) => {
    const id = req.params.id;
    todos.findByIdAndDelete(id, (err, doc) => {
        if (err) {
            res.json({
                message: 'gagal menghapus todo',
                error: err,
            });
        }
        res.json({
            message: `sukses menghapus todo dengan id : ${id}`,
        });
    });
};
