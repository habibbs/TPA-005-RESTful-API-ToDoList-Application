const mongoose = require('mongoose');
const userSchema = mongoose.Schema({
    username: String,
    email: String,
    password: String,
})
const dUser = mongoose.model('user', userSchema);

module.exports = dUser;