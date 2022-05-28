const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    username: String,
    password: {type:String, required:true}
});

module.exports = mongoose.model('users', userSchema);