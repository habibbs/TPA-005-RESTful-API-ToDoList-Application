const express = require('express');
const app = express();
const port = 3000;
const mongoose = require('mongoose');
const logger = require('morgan');
const todos = require('./models/todos');

mongoose.connect('mongodb://localhost:27017/todo-api', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

app.use(logger('dev'));

// GET
// POST
// PUT
// DELETE

app.get('/', (req, res) => {
    res.send('hello world');
});

app.get('/todo/:name', (req, res) => {
    const name = req.params.name;
    const todo = new todos({ name });

    todo.save().then(() => {
        res.json({
            message: 'Data berhasil disimpan',
        });
    });
});

app.use('/api', require('./routes/api'));

app.listen(port, () => {
    console.log(`Server started @http:localhost:${port}`);
});
