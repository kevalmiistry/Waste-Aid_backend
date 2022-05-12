const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    fname: {
        type: String,
        required: true
    },
    lname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    profile_url: {
        type: String,
        default: null
    },
    isVerified: {
        type: Boolean,
        default: false
    }
})

const User = mongoose.model('users', userSchema)
module.exports = User
