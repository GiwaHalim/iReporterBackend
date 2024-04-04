const config = require('config')
const mongoose = require('mongoose')
const express = require('express')
const app = express()
const home = require('./routes/home')
const user = require('./routes/users')
const auth = require('./routes/auth')
const report = require('./routes/report')
const cors = require('cors')

if(!config.get('jwtPrivateKey')){
    console.error('FATAL ERROR: jwtPrivateKey not defined');
    process.exit(1)
}

mongoose.connect('mongodb://localhost:27017/ireporter').then(()=>{console.log('connected')}).catch(err => console.error('could not connect'))

app.use(cors())
app.use(express.json())
app.use('/', home)
app.use('/api/user', user)
app.use('/api/auth', auth)
app.use('/api/report', report)

const port = process.env.PORT || 3005;
app.listen(port, ()=> console.log(`Listening on port ${port}...`))


