const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');
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
router.get('/users', async (req,res)=>{
    const fuser= await User.find();
    console.log(fuser);
    res.json(fuser);
});
router.post('/login', async (req,res)=>{
    const { name, password } = req.body;
    const fuser = await User.findOne({name: name});
    if(fuser){
        if(!bcrypt.compareSync(password,fuser.password)){
            res.send('error');
        }else{
            res.send(JSON.stringify(fuser.session));
        }
    }else{
        res.send('error');
    }
});


router.post('/session', async (req,res) =>{
    const filter = { name: req.body.name };
    const update = { session: req.body };
    await User.findOneAndUpdate(filter, update);
});
router.post('/signup', async (req,res)=>{
    const { name, email, password } = req.body;
    const fuser = await User.findOne({name: name});
    const femail = await User.findOne({email:email});
    const pwd = await bcrypt.hashSync(password, bcrypt.genSaltSync(8));
    console.log(pwd); 
    if(fuser){
        return res.send('error');
    }else if(femail){
        return res.send('error2');
    }else{
        const newUser = new User();
        newUser.name = name;
        newUser.password = pwd;
        newUser.email = email;
        newUser.maxScore = 0;
        newUser.code = Math.floor(Math.random() * 999999);
        newUser.session = {
            "name": name,
            "score": 0,
            "playing": false,
            "character": {},
            "room":{},
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