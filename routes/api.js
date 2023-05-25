const express = require('express');
const router = express.Router();

router.use('/todos', require('./api/todos'));

module.exports = router;
