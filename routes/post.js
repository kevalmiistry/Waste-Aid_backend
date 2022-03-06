const express = require('express')
const router = express.Router()
const fetchUser = require('../middleware/fetchUser')
const Post = require('../models/postModel')
// const cloudinary = require('../utils/Cloudinary')

// ROUTE 1: Fetch all post at|POST /api/post/fetchposts | - Login Required
router.post('/fetchposts', fetchUser, async (req, res) => {
    try {
        const posts = await Post.find().sort({ _id: 1 })
        res.json({ posts })
    } catch (error) {
        res.status(500).json({ error: 'Some Internal Error Occured' })
    }
})

// ROUTE 1: Add new Post at|POST /api/post/addpost | - Login Required
router.post('/addpost', fetchUser, async (req, res) => {
    try {
        const { am_name, title, description, address, target, contact_number, amount_collected, user_count } = req.body

        // Cloudinary File Upload
        // const img1 = req.files.image1
        // const result1 = await cloudinary.uploader.upload(img1.tempFilePath)

        // const img2 = req.files.image2
        // const result2 = await cloudinary.uploader.upload(img2.tempFilePath)

        // const img3 = req.files.image3
        // const result3 = await cloudinary.uploader.upload(img3.tempFilePath)

        // const img4 = req.files.image4
        // const result4 = await cloudinary.uploader.upload(img4.tempFilePath)

        // const img5 = req.files.image5
        // const result5 = await cloudinary.uploader.upload(img5.tempFilePath)

        // const img6 = req.files.image6
        // const result6 = await cloudinary.uploader.upload(img6.tempFilePath)

        // const img7 = req.files.image7
        // const result7 = await cloudinary.uploader.upload(img7.tempFilePath)

        // const img8 = req.files.image8
        // const result8 = await cloudinary.uploader.upload(img8.tempFilePath)

        // const img9 = req.files.image9
        // const result9 = await cloudinary.uploader.upload(img9.tempFilePath)

        // const img10 = req.files.image10
        // const result10 = await cloudinary.uploader.upload(img10.tempFilePath)


        const newPost = await Post.create({
            user_id: req.user.id,
            am_name,
            title,
            description,
            address,
            target,
            contact_number,
            amount_collected,
            user_count,
            // images: {
            //     image_1: {
            //         url: result1.secure_url,
            //         public_id: result1.public_id
            //     },
            //     image_2: {
            //         url: result2.secure_url,
            //         public_id: result1.public_id
            //     },
            //     image_3: {
            //         url: result3.secure_url,
            //         public_id: result1.public_id
            //     },
            //     image_4: {
            //         url: result4.secure_url,
            //         public_id: result1.public_id
            //     },
            //     image_5: {
            //         url: result5.secure_url,
            //         public_id: result1.public_id
            //     },
            //     image_6: {
            //         url: result6.secure_url,
            //         public_id: result1.public_id
            //     },
            //     image_7: {
            //         url: result7.secure_url,
            //         public_id: result1.public_id
            //     },
            //     image_8: {
            //         url: result8.secure_url,
            //         public_id: result1.public_id
            //     },
            //     image_9: {
            //         url: result9.secure_url,
            //         public_id: result1.public_id
            //     },
            //     image_10: {
            //         url: result10.secure_url,
            //         public_id: result1.public_id
            //     }
            // }
        })

        res.json({ success: true, newPost })

    } catch (error) {
        res.status(500).json({ error: 'Some Internal Error Occured' })
    }
})

module.exports = router