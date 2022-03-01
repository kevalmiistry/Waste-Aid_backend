const mongoose = require('mongoose')

const tokenSchema = mongoose.Schema({
    user_id: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    am_id: {
        type: String,
        required: true
    },
    recieved: {
        type: Boolean,
        default: false
    },
    post_id: {
        type: String,
        required: true
    }
})