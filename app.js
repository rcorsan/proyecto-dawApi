/*
*IMPORTACION DE LOS MODULOS REQUERIDOS
*/
import dotenv from "dotenv"
dotenv.config();   // Carga las variables de entorno
const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');

// usar express.json en lugar del paquete body-parser
app.use(express.json());
app.set("json spaces" , 2)

/*
*MECANISMO QUE PERMITE A UN SERVIDOR INDICAR CUALQUIER ORIGEN QUE NO SEA EL SUYO DESDE EL CUAL UN NAVEGADOR DEBERIA PERMITIR LA CARGA DE RECURSOS
*/
if(!process.env.FRONTEND_DOMAIN){
    throw Error("Falta la URL del front end en .env");
}

// Cambiar origin a origin: "*" para permitir cualquier origen
app.use(cors({
    origin: process.env.FRONTEND_DOMAIN,
    methods: ["GET", "POST",],
    allowedHeaders: ["Authorization", "Content-Type"],
    maxAge: 86400,
  }));


/*
*IMPORTAR DIRECTORIO DE LAS RUTAS
*/
const Ruta = require('./routes/rutas');
app.use('/', Ruta);

/*
*CONEXION CON LA BASE DE DATOS
*/
if(!process.env.DB_CONNECTION){
    throw Error("Falta la URL de mongodb en .env");
}

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