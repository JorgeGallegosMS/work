const mongoose = require('mongoose')
const { dbUrl } = require('../vars')

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
}

mongoose.connect(dbUrl, options);

mongoose.connection.on('connected', () => {
    // mongoose.connection.dropDatabase()
    console.log('Connected')
})

module.exports = mongoose.connection