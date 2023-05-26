const express = require('express');
const app = express();
const port = 3000;
const mongoose = require('mongoose');
const logger = require('morgan');
const bodyParser = require('body-parser');
const todos = require('./models/todos');

mongoose.connect('mongodb+srv://habib:syawalihabib23@cluster1.oiim0oh.mongodb.net/todo-api', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

app.use(logger('dev'));
app.use(bodyParser.json());

app.use(
    bodyParser.urlencoded({
        extended: true,
    })
);

app.use('/api', require('./routes/api'));

app.listen(port, () => {
    console.log(`Server started @http:localhost:${port}`);
});
