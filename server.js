require('dotenv').config();
const express = require('express')
const generate = require("./routers/generate")
var cors = require('cors')

const app = express()
app.use(cors())

app.use('/generate', generate)

app.listen(process.env.BACKEND_PORT, () => {
console.log(`Example app listening on port ${process.env.BACKEND_PORT}`)
})