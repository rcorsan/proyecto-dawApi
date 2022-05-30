const express = require('express');
const mongoose = require('mongoose');
const User = require('../models/user');
const consumables = require('../models/consumables');
const enemies = require('../models/enemies');
const skills = require('../models/skills');
const equpments = require('../models/equipments');
const helps = require('../models/helps');
const { response } = require('express');

const router = express.Router();
router.get('/', (req,res)=>{
    res.send('pagina principal');
});
router.get('/consumables', async (req,res)=>{
    const fcon= await consumables.find();
    res.json(fcon);
});
router.get('/enemies', async (req,res)=>{
    const fen= await enemies.find();
    res.json(fen);
});
router.get('/skills', async (req,res)=>{
    const fsk= await skills.find();
    res.json(fsk);
});
router.get('/equipments', async (req,res)=>{
    const fequi= await equpments.find();
    res.json(fequi);
});
router.get('/helps', async (req,res)=>{
    const fhelp= await helps.find();
    console.log(fhelp);
    res.json(fhelp);
});
router.post('/login', async (req,res)=>{
    const { name, password } = req.body;
    const fuser = await User.findOne({name: name});
    if(fuser){
        if(fuser.password != password){
            res.send('error');
        }else{
            res.send(JSON.stringify(fuser.session));
        }
    }else{
        res.send('error');
    }
});

router.post('/signup', async (req,res)=>{
    const { name, email, password } = req.body;
    const fuser = await User.findOne({name: name});
    const femail = await User.findOne({email:email});
    if(fuser){
        return res.send('error');
    }if(femail){
       return res.send('error2');
    }else{
        const newUser = new User();
        newUser.name = name;
        newUser.password = password;
        newUser.email = email;
        newUser.code = Math.floor(Math.random() * 999999);
        newUser.session = {
            "name": name,
            "maxScore":0,
            "image": "caro-asercion/prank-glasses.svg"
        };
       
        await newUser.save();
       return res.send(JSON.stringify(newUser.session));
    }
});


router.post('/', (req,res) => {
    res.header('Access-Control-Allows-Origin', '*');
    res.send('funciona');
    console.log(req.body);
})



module.exports = router;