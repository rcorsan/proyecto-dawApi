const mongoose = require('mongoose');

const eqSchema = mongoose.Schema({
    nombre: String,
    descripcion: String,
    estadisticas: Object,
    precio: Number,
    clase: String,
    tipo: String,
    rareza: Number,
    imagen: String
    
});

module.exports = mongoose.model('equipments', eqSchema);