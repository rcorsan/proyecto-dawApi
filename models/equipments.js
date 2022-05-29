const mongoose = require('mongoose');

const eqSchema = mongoose.Schema({
    nombre: String,
    descripcion: String,
    estadisticas: {
        fuerza: Number,
        magia: Number,
        defensa: Number,
        resistencia: Number,
        destreza: Number,
        suerte: Number,
        vitalidad: Number,
        espiritu: Number

    },
    precio: Number,
    clase: String,
    tipo: String,
    rareza: Number,
    imagen: String
    
});

module.exports = mongoose.model('equipments', eqSchema);