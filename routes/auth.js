const express = require('express')
const router = express.Router()
const User = require('../models/tempuser')

router.post('/create', (req, res) => {
    try {
        const response = User.create({
            name: req.body.name,
            age: req.body.age,
            address: req.body.address
        })
        // if (response.ok) res.send({ success: 'Data Inserted' })
        res.json({ success: 'Success', response })
    } catch (error) {
        console.log(error)
    }
})

module.exports = router
