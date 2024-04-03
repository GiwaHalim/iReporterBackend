const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    email: String,
    password: String,
    Address: String,
    city: String,
    State:String,
    zip:String,
    isAdmin: Boolean
})

const User = mongoose.model('User', userSchema)


module.exports = User