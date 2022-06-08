//IMPORTACION DE MODULOS REQUERIDOS
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv/config');
const mongoose = require('mongoose');

//LEER EL CUERPO Y ANALIZARLO EN UN OBJETO JSON QUE PODAMOS ENTENDER
app.use(bodyParser.json());

//MECANISMO PARA PERMITIR O NO LOS RECURSOS SOLICITADOS DEPENDIENDO DE DONDE SE HACE LA SOLICITUD 
app.use(cors());


//IMPORTAR DIRECTORIO RUTAS
const pruebaRuta = require('./routes/rutas');
app.use('/', pruebaRuta);

//CONEXION CON BASE DE DATOS
mongoose.connect(process.env.DB_CONNECTION, {useNewUrlParser: true,useUnifiedTopology: true}).then(console.log('conectado a la base de datos')).catch(err => console.error(err));

//SI NO HAY PUERTO PONER EL 3000
app.set('port', process.env.PORT || 3000);


//SERVIDOR A LA ESCUCHA EN EL PUERTO ESTABLECIDO
app.listen(app.get('port'), ()=>{
    console.log('server on port', app.get('port'));
});