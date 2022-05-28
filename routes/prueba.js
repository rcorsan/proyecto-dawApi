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
    console.log(req.body);
    /*const { username, password }= req.body;
    const fuser = await User.findOne({username: username});
    if(fuser){
        console.log('existe el user');
    }else{
        console.log('no existe el user');
    }*/

})



module.exports = router;