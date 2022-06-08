//CREACION DE LOS ESQUEMAS (REGLAS) Y MODELOS 
const mongoose = require('mongoose');

const skillsSchema = mongoose.Schema({
    nombre: String,
    descripcion: String,
    explicacion: String,
    coste: Number,
    requisitos: Object,
    equipo: String,
    imagen: String  
});

module.exports = mongoose.model('skills', skillsSchema);