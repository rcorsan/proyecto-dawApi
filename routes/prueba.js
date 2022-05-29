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
router.get('/consumables', (req,res)=>{
    res.json(consumables.find());
});

router.post('/', (req,res) => {
    res.header('Access-Control-Allows-Origin', '*');
    res.send('funciona');
    console.log(req.body);
})



module.exports = router;