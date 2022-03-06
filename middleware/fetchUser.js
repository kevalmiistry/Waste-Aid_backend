const jwt = require('jsonwebtoken')

const fetchUser = (req, res, next) => {
    // get the user details from jwt token and add is to req object
    const token = req.header('auth-token')

    if (!token) {
        return res.status(401).json({ error: "Please authenticate your self" })
    }

    try {
        const data = jwt.verify(token, process.env.JWT_SECRET)
        req.user = data.user
        next()
    } catch (error) {
        return res.status(401).json({ error: "Please authenticate your self" })
    }
}

module.exports = fetchUser
