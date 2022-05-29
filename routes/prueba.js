const express = require('express');
const mongoose = require('mongoose');
const User = require('../models/user');
const consumables = require('../models/consumables');
const enemiess = require('../models/enemies');
const skills = require('../models/skills');
const equpment = require('../models/equipments');

const router = express.Router();
router.get('/', (req,res)=>{
    res.send('pagina principal');
});
router.get('/consumables', async (req,res)=>{
    //res.json(JSON.stringify(await consumables.find()));
    const fcon= await consumables.find();
    res.json(fcon);
});

router.post('/', (req,res) => {
    res.header('Access-Control-Allows-Origin', '*');
    res.send('funciona');
    console.log(req.body);
})



module.exports = router;