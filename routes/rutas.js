/*
*IMPORTAR PAQUETES Y MODELOS REQUERIDOS 
*/

const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const User = require('../models/user');
const consumables = require('../models/consumables');
const enemies = require('../models/enemies');
const skills = require('../models/skills');
const equpments = require('../models/equipments');
const helps = require('../models/helps');
const nodemailer = require('nodemailer');
const { default: authenticateUser } = require('../Middleware/user.middleware');
const router = express.Router();



router.get('/', (req,res)=>{
    res.send('pagina principal');
});

/*
*RUTAS CON METODO GET PARA EL ENVIO DE DATOS DESDE LA BBDD
*/
router.get('/consumables', async (req,res)=>{
    //FIND DEVUELVE TODOS LOS DATOS ALMACENADOS EN LA COLECCION PASADA, EN ESTE CASO CONSUMABLES
    const fcon= await consumables.find();

    //ENVIA EN FORMA DE JSON LOS DATOS ENCONTRADOS 
    res.send(fcon);
});
router.get('/enemies', async (req,res)=>{
    const fen= await enemies.find();
    res.send(fen);
});
router.get('/skills', async (req,res)=>{
    const fsk= await skills.find();
    res.send(fsk);
});
router.get('/equipments', async (req,res)=>{
    const fequi= await equpments.find();
    res.send(fequi);
});
router.get('/helps', async (req,res)=>{
    const fhelp= await helps.find();
    res.send(fhelp);
});
router.get('/users', async (req,res)=>{
    const fuser= await User.find();
    res.send(fuser);
});

/*
*RUTAS POST 
*/


// Usar la middleware authenticatUser para quitar todo el boilerplate de autenticación
router.post('/login' , authenticateUser , async (req,res)=>{

    // Si la middleware ejecuta y hemos llegado aquí, el usuario está autenticado y puedes acceder lo con req.user
    // Si ves en user.middleware.js el req.user = user; antes de la funcion next()

    const fuser = req.user;
    res.send(fuser.session);
 
});

/*
*METODO PARA ACTUALIZAR LA SESSION
*/
router.post('/session', async (req,res) =>{
    res.header('Access-Control-Allow-Origin', '*');
    const fuser = await User.findOne({name: req.body.name}); 
    if(!fuser){
        res.status(404).send('404 Not found');
        return;
    }
    fuser.session = req.body;
    await fuser.save();
    res.send(fuser);
});

/*
*RUTA CON METODO POST PARA EL INICIO DE SESION
*/
router.post('/signup', async (req,res)=>{
    const { name, email, password } = req.body;
    //BUSCA EN LA BBDD SI EXISTE UN USUARIO Y UN EMAIL CON LOS PASADOS
    const fuser = await User.findOne({name: name});
    const femail = await User.findOne({email:email});
    //ENCRIPTA LA CONTRASEÑA PASADA
    const pwd = await bcrypt.hashSync(password, bcrypt.genSaltSync(8));
    console.log(pwd); 
    if(fuser){
        //SI YA EXISTE EL USUARIO ENVIA UN MENSAJE DE ERROR
        return res.send('error');
    }else if(femail){
        //SI YA EXISTE EL EMAIL ENVIA UN MENSAJE DE ERROR
        return res.send('error2');
    }else{
        //SI NO EXISTE NINGUN USUARIO CON LOS DATOS PASADOS LO CREA
        const newUser = new User();
        newUser.name = name;
        newUser.password = pwd;
        newUser.email = email;
        newUser.code = Math.floor(Math.random() * 999999);
        newUser.session = {
            "name": name,
            "score": 0,
            "maxScore": 0,
            "playing": false,
            "character": {},
            "room":{},
            "image": "caro-asercion/prank-glasses.svg"
        };
        await newUser.save();
        
        //MODULO PARA EL ENVIO DE CORREO, AQUI SE ESTABLECE EL SERVICIO Y EL HOST
        const transport = nodemailer.createTransport({
            host:'smtp.gmail.com',
            port:465,
            secure:true,
            auth: {
              user: "gamevictoryraquel@gmail.com",
              pass: "fjkdbbsktvqyuvsk"
            }
        });

        //DATOS DE ENVIO DEL EMAIL
        await transport.sendMail({
            from:"bienvenida",
            to:newUser.email,
            subject: "Bienvenid@!",
            text: "Bienvenid@ "+newUser.name+".",
            html:'<p>Este es un correo automático de confirmación,si quieres seguir jugando accede a este <a href="http://rcorsan.github.io/proyecto-daw/">link</a></p>'
        }); 
        return res.send(JSON.stringify(newUser.session));
    }
});

/*
*RUTA CON METODO POST PARA LA PETICION DE EL CAMBIO DE CONTRASEÑA
*/
router.post('/passwordreq', async (req,res) => {
    const { name } = req.body;
    const fuser = await User.findOne({name:name});
    //SI NO EXISTE EL USUARIO ENVIA UN MENSAJE DE ERROR
    if(!fuser){
        res.send('error');
    }else{
        //SI EXISTE ENVIA UN EMAIL AL CORREO DEL USUARIO PARA REDIRIGIRLE AL CAMBIO DE CONTRASEÑA
        res.send('ok');
        const transport = nodemailer.createTransport({
            host:'smtp.gmail.com',
            port:465,
            secure:true,
            auth: {
              user: "gamevictoryraquel@gmail.com",
              pass: "fjkdbbsktvqyuvsk"
            }
        });
        await transport.sendMail({
            from:"juego",
            to:fuser.email,
            subject: "Cambio de contraseña",
            text: "Bienvenid@ "+fuser.name+".",
            html:'<p>Este es un correo automático de confirmación,si quieres seguir con el proceso accede a este <a href="https://rcorsan.github.io/proyecto-daw/passwordres/">link</a></p>'
        }); 
    }
});

/*
*RUTA CON METODO POST PARA EL CAMBIO DE CONTRASEÑA
*/
router.post('/passwordres', async (req,res) => {
    const { name, password,password2 } = req.body;
    const fuser = await User.findOne({name:name});
    //SI EXISTE LA CONTRASEÑA Y COINCIDE CON SU CONTRASEÑA ACTUALIZA ESTA
    if(!fuser){
        res.send("error");
    }else if(password!=password2){
        res.send("error2");
    }else{
        const user = new User({
            _id: fuser._id,
            name: fuser.name,
            password:await bcrypt.hashSync(password, bcrypt.genSaltSync(8)),
            session: fuser.session,
            email: fuser.email,
            code: fuser.code,
            });
            fuser.delete();
            user.save();
            res.send("ok");
    }
});



module.exports = router;