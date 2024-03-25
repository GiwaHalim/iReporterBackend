const mongoose = require('mongoose')
const express = require('express')
const app = express()
const user = require('./routes/users')
const home =require('./routes/home')

mongoose.connect('mongodb://localhost:27017/ireporter').then(()=>{console.log('connected')}).catch(err => console.error('could not connect'))

const userSchema = new mongoose.Schema({
    email: String,
    password: String,
    Address: String,
    city: String,
    State:String,
    zip:String
})

const User = mongoose.model('User', userSchema)

async function createUser() {
    const user = new User({
        email: "bigjoe@yahoo.com",
        password: "vvjhhjv",
        address: "ggigigig",
        city: "vjvkvhkv",
        state: "vkvbkv",
        zip: "vjvjvjv"

    })


    const result = await user.save()
    console.log(result)
    console.log('hi')
    
}


app.use(express.json())
app.use('/api/user', user)
app.use('/', home)

const port = process.env.PORT || 3005;
app.listen(port, ()=> console.log(`Listening on port ${port}...`))


