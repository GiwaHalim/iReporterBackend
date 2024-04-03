const mongoose = require('mongoose')

const reportSchema = new mongoose.Schema({
    title: String,
    description: String,
    type: String,
    date: Date,
    status: String,
    userId: String,
})

const Report = mongoose.model('Report', reportSchema)


module.exports = Report