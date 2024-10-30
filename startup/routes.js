const express = require('express')
const home = require('../routes/home')
const user = require('../routes/users')
const auth = require('../routes/auth')
const report = require('../routes/report')
const cors = require('cors')
const err = require('../middleware/error')


module.exports = function(app){
    app.use(cors())
    app.use(express.json())
    app.use('/', home)
    app.use('/api/user', user)
    app.use('/api/auth', auth)
    app.use('/api/report', report)
    app.use(err)
}