const dotenv = require('dotenv');
const todos = require('../models/todos');
const dUser = require('../models/users');
const bcryptjs = require('bcryptjs');
const jsonwebtoken = require('jsonwebtoken');
dotenv.config();
//  menampilkan semua data
module.exports.getAllTodos = (req, res) => {
    todos.find().then((result, err) => {
        if (err) {
            res.status(500).json({
                message: 'Internal Server Error',
            });
        }
        res.status(200).json({
            data: result,
            message: 'berhasil menampilkan seluruh data',
        });
    });
};

//  menampilkan data berdasarkan id
module.exports.getTodoById = (req, res) => {
    const idTodo = req.params.id;
    todos.findById(idTodo).then((result, err) => {
        if (err) {
            res.status(500).json({
                message: 'Internal Server Error',
            });
        }
        res.status(200).json({
            data: result,
            message: 'success get todo by ID',
        });
    });
};

//  menambahkan data
module.exports.addTodo = (req, res) => {
    const body = req.body;
    const todo = new todos({ name: body.name });

    todo.save().then(() => {
        res.status(200).json({
            message: 'Data berhasil disimpan',
        });
    });
};

//  menghapus data berdasarkan id
module.exports.deleteTodoById = (req, res) => {
    const id = req.params.id;
    todos.findByIdAndDelete(id).then((result, err) => {
        if (err) {
            res.status(400).json({
                message: 'gagal menghapus todo',
                error: err,
            });
        }
        res.status(200).json({
            message: `sukses menghapus todo dengan id : ${id}`,
        });
    });
};

//  update atau edit data berdasarkan id
module.exports.updateTodoById = (req, res) => {
    const id = req.params.id;
    const todoLoad = req.body;

    todos.findByIdAndUpdate(id, todoLoad).then((result, err) => {
        if (err) {
            res.status(400).json({
                message: `Gagal mengubah data`,
            });
        }
        res.status(200).json({
            message: `Berhasil mengubah data dengan id : ${id}`,
        });
    });
};

//  menghapus seluruh data
module.exports.deleteAllTodo = (req, res) => {
    todos.deleteMany().then((result, err) => {
        if(err) {
            res.status(400).json({
                message: 'gagal menghapus semua todo',
            })
        }
        res.status(200).json({
            message: 'Semua data berhasil dihapus',
        })
    })
};


module.exports.daftarUser = async (req, res) => {
    const body = req.body;

    const hashing = await bcryptjs.hash(body.password, 10)
    const user = new dUser ({
        username: body.username,
        email: body.email,
        password: hashing,
    })
    user.save().then(() => {
        res.status(200).json({
            message: 'User berhasil didaftarkan',
        });
    });
}

module.exports.loginUser = async (req, res) => {
    const { username, password } = req.body;
    const dataUser = await dUser.findOne({$or: [{username: username}, {email: username}]})

    if(dataUser) {
        const passwordUser = await bcryptjs.compare(password, dataUser.password)
        
        if(passwordUser) {
            const data = {
                id: dataUser._id,
            }
            const token = await jsonwebtoken.sign(data, process.env.JWT_SECRET)
            res.status(200).json({
                message: 'Berhasil login',
                token: token,
            })
        }
    } else {
        return res.status(404).json({
            message: 'Login Gagal'
        })
    }
}
