const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: String,
    password: {type:String, required:true},
    session: Object
});

module.exports = mongoose.model('users', userSchema);