const config = require('config');
const jwt = require('jsonwebtoken');
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const {User, validateUser} = require('../model/usersModel');
const bcrypt = require('bcrypt');



router.post('/', async (req, res) => {
    const result = validateUser(req.body)
    console.log(req.body)
    
    if (result.error) return res.status(400).send(result.error.details[0].message);
    
    try{
        let user = await User.findOne({email: req.body.email})
        if (user) return res.status(400).send('user already exist')
        
        const saltRounds = 10;
        const myPlaintextPassword = req.body.password;
        
        const salt = await bcrypt.genSalt(saltRounds)
        const hash = await bcrypt.hash(myPlaintextPassword, salt)
        
        user = new User({
            email: req.body.email,
            name: req.body.name,
            password: hash,
            address: req.body.address,
            city: req.body.city,
            state: req.body.state,
            zip: req.body.zip,
            isAdmin: false
        })
        
        user.save()
        const token = user.generateAuthToken();
        
        
        res.send({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: token
        })
        
    }catch(ex){
        next(ex)
    }
        
        
    })
    
    
    
module.exports = router;