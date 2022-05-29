const mongoose = require('mongoose');

const enSchema = mongoose.Schema({
    nombre: String,
    descripcion: String,
    estadisticasMin: Object,
    estadisticasMax: Object,
    clase: Number,
    tipo: String,
    imagen: String 
});

module.exports = mongoose.model('enemies', enSchema);