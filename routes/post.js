const express = require('express')
const router = express.Router()
const fetchUser = require('../middleware/fetchUser')
const Post = require('../models/postModel')
const cloudinary = require('../utils/Cloudinary.js')

// ROUTE 1: Fetch all post at|POST /api/post/fetchposts | - Login Required
router.post('/fetchposts', fetchUser, async (req, res) => {
    try {
        const posts = await Post.find().sort({ _id: -1 })
        res.json(posts)
    } catch (error) {
        res.status(500).json({ error: 'Some Internal Error Occured' })
    }
})

// ROUTE 2: Fetch One post at|POST /api/post/fetchonepost | - Login Required
router.post('/fetchonepost', fetchUser, async (req, res) => {
    try {
        const { id } = req.body
        const post = await Post.find({ _id: id })
        res.json(post)
    } catch (error) {
        res.status(500).json({ error: 'Some Internal Error Occured' })
    }
})

// ROUTE 3: Add new Post at|POST /api/post/addpost | - Login Required
router.post('/addpost', fetchUser, async (req, res) => {
    try {
        const { am_name, title, description, address, target, contact_number, amount_collected, user_count } = req.body

        // Cloudinary File Upload
        let result = { image1: null, image2: null, image3: null, image4: null, image5: null, image6: null, image7: null, image8: null, image9: null, image10: null }
        for (const property in req.files) {
            const img = req.files[property]
            let r = await cloudinary.uploader.upload(img.tempFilePath)
            result = { ...result, [property]: r }
        }

        const newPost = await Post.create({
            am_id: req.user.id,
            am_name,
            title,
            description,
            address,
            target,
            contact_number,
            amount_collected,
            user_count,
            images: {
                image_1: {
                    url: result.image1 ? result.image1.secure_url : null,
                    public_id: result.image1 ? result.image1.public_id : null
                },
                image_2: {
                    url: result.image2 ? result.image2.secure_url : null,
                    public_id: result.image2 ? result.image2.public_id : null
                },
                image_3: {
                    url: result.image3 ? result.image3.secure_url : null,
                    public_id: result.image3 ? result.image3.public_id : null
                },
                image_4: {
                    url: result.image4 ? result.image4.secure_url : null,
                    public_id: result.image4 ? result.image4.public_id : null
                },
                image_5: {
                    url: result.image5 ? result.image5.secure_url : null,
                    public_id: result.image5 ? result.image5.public_id : null
                },
                image_6: {
                    url: result.image6 ? result.image6.secure_url : null,
                    public_id: result.image6 ? result.image6.public_id : null
                },
                image_7: {
                    url: result.image7 ? result.image7.secure_url : null,
                    public_id: result.image7 ? result.image7.public_id : null
                },
                image_8: {
                    url: result.image8 ? result.image8.secure_url : null,
                    public_id: result.image8 ? result.image8.public_id : null
                },
                image_9: {
                    url: result.image9 ? result.image9.secure_url : null,
                    public_id: result.image9 ? result.image9.public_id : null
                },
                image_10: {
                    url: result.image10 ? result.image10.secure_url : null,
                    public_id: result.image10 ? result.image10.public_id : null
                }
            }
        })

        res.json({ success: true, message: 'New Post Uploaded' })

    } catch (error) {
        res.status(500).json({ error: 'Some Internal Error Occured' })
    }
})

// ROUTE 4: Fetch Aid-man's Posts at|POST /api/post/fetchampost | - Login Required
router.post('/fetchampost', fetchUser, async (req, res) => {
    try {
        const amid = req.user.id
        const post = await Post.find({ am_id: amid }).sort({ _id: -1 })
        res.json(post)
    } catch (error) {
        res.status(500).json({ error: 'Some Internal Error Occured' })
    }
})

// ROUTE 5: Delete Aid-man's Posts at|POST /api/post/delete | - Login Required
router.post('/delete', fetchUser, async (req, res) => {
    try {
        const id = req.body.id
        const amid = req.user.id
        const post = await Post.find({ _id: id })
        if (post[0].am_id === amid) {
            await Post.findByIdAndDelete(id)
            res.json({ success: true, message: 'Post Deleted!' })
        } else {
            res.json({ success: false, message: 'Oops! There is some error' })
        }
    } catch (error) {
        res.status(500).json({ error: 'Some Internal Error Occured' })
    }
})

module.exports = router
