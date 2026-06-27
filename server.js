const express = require("express")
const dotenv = require("dotenv")

dotenv.config()

const app = express()
const port = process.env.PORT || 3000

// This lets my API read JSON data from requests
app.use(express.json())

// This is a simple test route to make sure the server works
app.get("/", (req, res) => {
  res.send("HomeFix API is running")
})

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})