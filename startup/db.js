const mongoose = require('mongoose')
const logger = require('../logger')
const config = require('config')

module.exports = function(){
    // const mongoUrl = "mongodb+srv://iReporteradmin:12345@cluster07126.vzblzil.mongodb.net/?retryWrites=true&w=majority&appName=Cluster07126"
    const mongoUrl = config.get('db')
    mongoose.connect(mongoUrl, {useUnifiedTopology: true})
    .then(()=>{
        logger.info(`Connected to ${mongoUrl}`)
    })
    }