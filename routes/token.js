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
        res.json({ token })
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
            await Token.findByIdAndUpdate(id, { recieved })

            const post = await Post.find({ _id: token.post_id })

            await Post.findByIdAndUpdate(token.post_id, {
                amount_collected: post[0].amount_collected + token.amount,
                user_count: post[0].user_count + 1,
            })

            res.json({ success: true, post })
        } else {
            res.json({ success: false, token })
        }
    } catch (error) {
        res.status(500).json({ msg: 'Some Internal Error Occured', error })
    }
})

module.exports = router
