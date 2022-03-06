const connectToMongo = require('./db')
const express = require('express')
const cors = require('cors')

connectToMongo()

const app = express()
const PORT = 5000

app.use(cors())
app.use(express.json())

app.use('/api/auth/', require('./routes/auth'))
app.use('/api/post/', require('./routes/post'))

app.listen(PORT, () => console.log(`Server listening at PORT:${PORT}`))
