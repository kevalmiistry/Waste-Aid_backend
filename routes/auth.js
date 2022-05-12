const express = require('express')
const router = express.Router()
const { body, validationResult } = require('express-validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/userModel')
const fetchUser = require('../middleware/fetchUser')
const sendMail = require('../utils/Mailer')


// ROUTE 1: Create an new Account at|POST /api/auth/createuser | - No Login Required
router.post('/createuser', [
    body('fname', 'Please Enter Your First Name').isLength({ min: 1 }),
    body('lname', 'Please Enter Your Last Name').isLength({ min: 1 }),
    body('email', 'Please Enter Valid Email Address').isEmail(),
    body('password', 'Password Must Be Of 8 Characters').isLength({ min: 8 })],
    async (req, res) => {
        let success = false
        // if there are errors, return Bad request and errors
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            const erArr = errors.array()
            return res.status(400).json({ success, error: erArr })
        }
        try {
            let user = await User.findOne({ email: req.body.email })
            if (user) {
                return res.status(400).json({ success, message: 'An account with this email already exist' })
            }

            const salt = await bcrypt.genSalt(10)
            const secPass = await bcrypt.hash(req.body.password, salt)
            user = await User.create({
                fname: req.body.fname,
                lname: req.body.lname,
                email: req.body.email,
                password: secPass
            })

            const data = {
                user: {
                    id: user.id
                }
            }
            const authToken = jwt.sign(data, process.env.JWT_SECRET)
            success = true
            const emailSent = await sendMail(user.email, authToken)
            if (emailSent) res.json({ success, message: 'Account Created! Check your email for verification', authToken })
        } catch (error) {
            console.error(error)
            res.status(500).send("Some Internal error occured")
        }
    })

// ROUTE 2: Login an Account at|POST /api/auth/login | - No Login Required
router.post('/login', [
    body('email', 'Please Enter Valid Email Address').isEmail(),
    body('password', 'Password Must Be Of 8 Characters').isLength({ min: 8 })],
    async (req, res) => {

        let success = false
        // if there are errors, return Bad request and errors 
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const erArr = errors.array()
            return res.status(400).json({ success, message: 'Please enter valid credentials' })
        }
        try {
            const { email, password } = req.body
            let success = false
            let user = await User.findOne({ email })

            if (!user) {
                return res.status(400).json({ success, message: 'Please enter valid credentials' })
            }
            if (!user.isVerified) {
                return res.status(400).json({ success, message: 'Please Verify Your Email Address' })
            }

            let passwordCompare = await bcrypt.compare(password, user.password)
            if (!passwordCompare) {
                return res.status(400).json({ success, message: 'Please enter valid credentials' })
            }

            const data = {
                user: {
                    id: user.id
                }
            }
            const authToken = jwt.sign(data, process.env.JWT_SECRET)
            success = true
            res.json({ success, message: 'Logged in successfully!', authToken })

        } catch (error) {
            console.error(error)
            res.status(500).send("Some Internal error occured")
        }
    })

// ROUTE 3: Get Logged in User Details at|POST /api/auth/getuser | - Login Required
router.post('/getuser', fetchUser, async (req, res) => {
    try {
        let userId = req.user.id
        const user = await User.findById(userId).select('-password')
        res.json(user)
    } catch (error) {
        res.status(500).send("Some Internal error occured")
    }
})

// ROUTE 4: Verify User and PATCH isVerified at|POST /api/auth/verify | - Auth Token Required
router.patch('/verify', fetchUser, async (req, res) => {
    try {
        let userId = req.user.id
        const user = await User.findByIdAndUpdate(userId, {
            isVerified: true
        })
        res.send({ success: true, message: 'Email Verified!' })
    } catch (error) {
        res.status(500).send({ error, msg: "Some Internal error occured" })
    }
})

module.exports = router
