const express = require('express');
const User = require('../models/user');

const router = express.Router();
router.get('/', (req,res)=>{
    res.send('pagina principal');
});
router.get('/prueba', (req,res)=>{
    res.send('Estamos en prueba');
});

router.post('/', async (req,res) => {
    res.json(req.body);
    console.log(req.body);
})



module.exports = router;