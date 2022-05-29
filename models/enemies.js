const mongoose = require('mongoose');

const enSchema = mongoose.Schema({
    nombre: String,
    descripcion: String,
    estadisticasMin: {
        fuerza: Number,
        magia: Number,
        defensa: Number,
        resistencia: Number,
        destreza: Number,
        suerte: Number,
        vitalidad: Number,
        espiritu: Number

    },
    estadisticasMax: {
        fuerza: Number,
        magia: Number,
        defensa: Number,
        resistencia: Number,
        destreza: Number,
        suerte: Number,
        vitalidad: Number,
        espiritu: Number

    },
    clase: Number,
    tipo: String,
    imagen: String 
});

module.exports = mongoose.model('enemies', enSchema);