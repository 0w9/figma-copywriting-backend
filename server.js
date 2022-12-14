require('dotenv').config();
const express = require('express')
const generate = require("./routers/generate")
var cors = require('cors')

const app = express()
app.use(cors())

const port = process.env.PORT || 3000

app.get("/", (req, res) => {
    res.json({test: "works"})
})

app.use('/generate', generate)
// Console
app.listen(port, () => {
console.log(`Example app listening on port 5001`)
})