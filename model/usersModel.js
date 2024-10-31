const mongoose = require('mongoose');
const Joi = require('joi');
const config = require('config');
const jwt = require('jsonwebtoken');


const userSchema = new mongoose.Schema({
    email: String,
    password: String,
    Address: String,
    city: String,
    State:String,
    zip:String,
    isAdmin: Boolean
})

userSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({ _id: this._id, isAdmin: this.isAdmin}, config.get('jwtPrivateKey'))
    
    return token
}
const User = mongoose.model('User', userSchema)

function validateUser(user) {
    const validationSchema = Joi.object({
        email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
        password: Joi.string().required(),
        address: Joi.string().required(),
        city: Joi.string().required(),
        zip: Joi.number().required()
      })
     return  validationSchema.validate(user)
}


module.exports.User = User
module.exports.validateUser = validateUser