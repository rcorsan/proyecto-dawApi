//CREACION DE LOS ESQUEMAS (REGLAS) Y MODELOS 
const mongoose = require('mongoose');

const helpSchema = mongoose.Schema({
    titulo: String,
    contenido: Array
});

module.exports = mongoose.model('helps', helpSchema);