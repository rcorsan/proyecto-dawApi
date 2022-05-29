const mongoose = require('mongoose');

const consSchema = mongoose.Schema({
    nombre: String,
    descripcion: String,
    explicacion: String,
    precio: Number,
    imagen: String
    
});

module.exports = mongoose.model('consumables', consSchema);