const express = require("express")
const dotenv = require("dotenv")
const routes = require("./routes")

dotenv.config()

const app = express()
const port = process.env.PORT || 3000

// This lets my API read JSON data from requests
app.use(express.json())

// This sends all main routes to my routes folder
app.use("/", routes)

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})