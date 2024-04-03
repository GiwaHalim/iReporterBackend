const config = require('config')
const jwt = require('jsonwebtoken')
const express = require('express');
const router = express.Router();
const Joi = require('joi');
const mongoose = require('mongoose');
const User = require('../model/usersModel');
const bcrypt = require('bcrypt');


router.post('/', async(req, res) => {
    const result = validateUser(req.body)

    if (result.error) return res.status(400).send(result.error.details[0].message);

    let user = await User.findOne({email: req.body.email})
    if (!user) return res.status(400).send('invalid Email or Password')

    bcrypt.compare(req.body.password, user.password, function(err, result) {
            isAdmin: user.isAdmin
        token = jwt.sign({ _id: user._id, isAdmin: user.isAdmin}, config.get('jwtPrivateKey'))
        !result ? res.status(400).send('invalid Email or Password'): res.send({
            email: user.email,
            _id: user._id,
            token: token
        })
    });

    

})

function validateUser(user) {
    const validationSchema = Joi.object({
        email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
        password: Joi.string().required(),
      })
     return  validationSchema.validate({
        email:user.email,
        password:user.password,
      })
}

module.exports = router