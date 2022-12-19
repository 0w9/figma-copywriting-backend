require('dotenv').config();
const express = require('express')
const generate = require("./routers/generate")
var cors = require('cors')

const app = express()
app.use(cors())

const port = process.env.PORT || 3000

app.use('/generate', generate)
// Console
app.listen(5001, () => {
console.log(`Example app listening on port 5001`)
})