const express = require('express');
const app = express();
const bodyParser = require('body-parser');
//const cors = require('cors');
require('dotenv/config');
const mongoose = require('mongoose');
app.use(bodyParser.json());
app.use(function(req,res,next){
    res.header('Access-Control-Allows-Origin', '*');
    res.header('Access-Control-Allows-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allows-Headers', 'Content-Type');
});


//IMPORTAR RUTAS
const pruebaRuta = require('./routes/prueba')

//BASE DE DATOS
mongoose.connect(process.env.DB_CONNECTION, {useNewUrlParser: true,useUnifiedTopology: true}).then(console.log('conectado a la base de datos')).catch(err => console.error(err));

//MIDDLEWARES
app.use('/', pruebaRuta);



//SETTINGS
app.set('port', process.env.PORT || 3000);


//SERVER
app.listen(app.get('port'), ()=>{
    console.log('server on port', app.get('port'));
});