require('dotenv').config()
const mongoose = require('mongoose')

const connectToMongo = () => {
    mongoose.connect(process.env.MONGO_URI, () => console.log('ConeCted to MonGo'))
}

module.exports = connectToMongo
