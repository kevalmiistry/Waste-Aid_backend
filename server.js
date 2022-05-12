const connectToMongo = require('./db')
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const fileUpload = require('express-fileupload')

connectToMongo()

const app = express()
const PORT = process.env.PORT || 5000

app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: '/tmp/'
}))

app.use(cors())

app.use(express.json())
app.use(bodyParser.json())

app.use('/api/auth/', require('./routes/auth'))
app.use('/api/post/', require('./routes/post'))
app.use('/api/token/', require('./routes/token'))

app.listen(PORT, () => console.log(`Server listening at PORT:${PORT}`))
