const express = require('express');
const mongoose = require('mongoose');
const User = require('../models/user');
const consumables = require('../models/consumables');
const enemies = require('../models/enemies');
const skills = require('../models/skills');
const equpments = require('../models/equipments');

const router = express.Router();
router.get('/', (req,res)=>{
    res.send('pagina principal');
});
router.get('/consumables', async (req,res)=>{
    //res.json(JSON.stringify(await consumables.find()));
    const fcon= await consumables.find();
    res.json(fcon);
});
router.get('/enemies', async (req,res)=>{
    //res.json(JSON.stringify(await consumables.find()));
    const fen= await enemies.find();
    res.json(fen);
});
router.get('/skills', async (req,res)=>{
    //res.json(JSON.stringify(await consumables.find()));
    const fsk= await skills.find();
    res.json(fsk);
});
router.get('/equipments', async (req,res)=>{
    //res.json(JSON.stringify(await consumables.find()));
    const fequi= await equpments.find();
    res.json(fequi);
});
router.post('/login', async (req,res)=>{
    const { name, password } = req.body;
    const fuser = await User.findOne({name: name});
    if(fuser){
        if(fuser.password != password){
            res.send('El usuario o la contraseña no son correctos');
        }else{
            res.send(JSON.stringify(fuser));
        }
    }else{
        res.send('El usuario o la contraseña no son correctos');
    }
});

router.post('/signup', async (req,res)=>{
    const { name, password } = req.body;
    const fuser = await User.findOne({name: name});
    if(fuser){
        res.send('El usuario ya existe, inicia sesion')
    }else{
        const newUser = new User();
        newUser.username = name;
        newUser.password = password;
        await newUser.save();
        res.send('Usuario creado correctamente!');
    }
});


router.post('/', (req,res) => {
    res.header('Access-Control-Allows-Origin', '*');
    res.send('funciona');
    console.log(req.body);
})



module.exports = router;