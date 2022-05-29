const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: String,
    password: {type:String, required:true}
});

module.exports = mongoose.model('users', userSchema);