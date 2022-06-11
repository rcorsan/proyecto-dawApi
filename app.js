/*
*IMPORTACION DE LOS MODULOS REQUERIDOS
*/
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv/config');
const mongoose = require('mongoose');

/*
*MODULO QUE SIRVE PARA LEER EL CUERPO DE LAS PETICIONES Y ANALIZARLO EN UN OBJETO JSON QUE PODAMOS ENTENDER
*/
app.use(bodyParser.json());

/*
*MECANISMO QUE PERMITE A UN SERVIDOR INDICAR CUALQUIER ORIGEN QUE NO SEA EL SUYO DESDE EL CUAL UN NAVEGADOR DEBERIA PERMITIR LA CARGA DE RECURSOS
*/
app.use(cors());


/*
*IMPORTAR DIRECTORIO DE LAS RUTAS
*/
const Ruta = require('./routes/rutas');
app.use('/', Ruta);

/*
*CONEXION CON LA BASE DE DATOS
*/
mongoose.connect(process.env.DB_CONNECTION, {useNewUrlParser: true,useUnifiedTopology: true}).then(console.log('conectado a la base de datos')).catch(err => console.error(err));

/*
* SI LA APLICACION ESTA ALOJADA EN UN HOSTING ESTE ESTABLECERA EL PUERTO, SI NO, SE USA EL 3000
*/
app.set('port', process.env.PORT || 3000);


/*
*SERVIDOR A LA ESCUCHA EN EL PUERTO ESTABLECIDO
*/
app.listen(app.get('port'), ()=>{
    console.log('server on port', app.get('port'));
});