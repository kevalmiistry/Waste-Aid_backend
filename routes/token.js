const express = require('express')
const router = express.Router()
const fetchUser = require('../middleware/fetchUser')
const Token = require('../models/tokenModel')
const Post = require('../models/postModel')

// ROUTE 1: Generate Token at|POST /api/token/gen | - Login Required
router.post('/gen', fetchUser, async (req, res) => {
    try {
        const { user_id, am_id, amount, recieved, post_id } = req.body
        const token = await Token.create({
            user_id: req.user.id,
            am_id,
            amount,
            recieved,
            post_id
        })
        res.json({ success: true, message: 'Token Generated!', token })
    } catch (error) {
        res.status(500).json({ msg: 'Some Internal Error Occured', error })
    }
})

// ROUTE 2: Update Token at|PATCH /api/token/update | - Login Required
router.patch('/update', fetchUser, async (req, res) => {
    try {
        const { id, recieved } = req.body
        const token = await Token.findById(id)

        if (req.user.id === token.am_id) {
            if (token.recieved) {
                res.json({ success: false, message: 'The Token is already verified!' })
            } else {

                const post = await Post.find({ _id: token.post_id })
                if (post.length === 0) {
                    res.json({ success: false, message: 'Could not find the Post for which this QR Code is' })
                } else {
                    await Token.findByIdAndUpdate(id, { recieved })

                    await Post.findByIdAndUpdate(token.post_id, {
                        amount_collected: post[0].amount_collected + token.amount,
                        user_count: post[0].user_count + 1,
                    })
                    res.json({ success: true, message: 'QR Code scanned and Token verified!', post })
                }
            }
        } else {
            res.json({ success: false, message: 'You are not an Aid-man for this QR Code' })
        }

    } catch (error) {
        res.status(500).json({ msg: 'Some Internal Error Occured', error })
    }
})

// ROUTE 3: Fetch Token at|PATCH /api/token/fetch | - Login Required
router.post('/fetch', fetchUser, async (req, res) => {
    try {
        const response = await Token.find({ user_id: req.user.id }).sort({ _id: -1 })
        res.json(response)
    } catch (error) {
        res.status(500).json({ msg: 'Some Internal Error Occured', error })
    }
})

module.exports = router
