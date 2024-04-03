const config = require('config');
const jwt = require('jsonwebtoken');
const express = require('express');
const router = express.Router();
const Joi = require('joi');
const mongoose = require('mongoose');
const User = require('../model/usersModel');
const bcrypt = require('bcrypt');



router.post('/', async (req, res) => {
    const result = validateUser(req.body)

    if (result.error) return res.status(400).send(result.error.details[0].message);


    let user = await User.findOne({email: req.body.email})
    if (user) return res.status(400).send('user already exist')

    const saltRounds = 10;
    const myPlaintextPassword = req.body.password;

    bcrypt.genSalt(saltRounds, function(err, salt) {
        bcrypt.hash(myPlaintextPassword, salt, function(err, hash) {
            user = new User({
                email: req.body.email,
                password: hash,
                address: req.body.address,
                city: req.body.city,
                state: req.body.state,
                zip: req.body.zip,
                isAdmin: false
    
        })

            user.save()
            token = jwt.sign({ _id: user._id, isAdmin: user.isAdmin }, config.get('jwtPrivateKey'))
            res.send({
                email: user.email,
                _id: user._id,
                token: token
            })

        });
        
    });

})

function validateUser(user) {
    const validationSchema = Joi.object({
        email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
        password: Joi.string().required(),
        address: Joi.string().required(),
        city: Joi.string().required(),
        zip: Joi.number().required()
      })
     return  validationSchema.validate({
        email:user.email,
        password:user.password,
        address:user.address,
        city:user.city,
        zip:user.zip
      })
}


module.exports = router;