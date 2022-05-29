const mongoose = require('mongoose');

const skillsSchema = mongoose.Schema({
    nombre: String,
    descripcion: String,
    explicacion: String,
    coste: Number,
    requisitos: {
        fuerza: Number,
        magia: Number,
        defensa: Number,
        resistencia: Number,
        destreza: Number,
        suerte: Number,
        vitalidad: Number,
        espiritu: Number,
        nivel: Number

    },
    equipo: String,
    imagen: String  
});

module.exports = mongoose.model('skills', skillsSchema);